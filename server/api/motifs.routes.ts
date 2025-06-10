import { Router } from 'express';
import { z } from 'zod';
import { storage } from '../storage'; // Adjust path if necessary
import { insertMotifSchema } from '@shared/schema';
import { authorizeRole, type AuthenticatedRequest } from '../middleware/rbac'; // Adjust path if necessary

const motifsRouter = Router();

// GET /api/motifs - Get all motifs with optional filters
motifsRouter.get("/", async (req, res) => {
  try {
    const { category, complexity } = req.query;
    const filters: { category?: string; complexity?: string } = {};

    if (category && typeof category === 'string') {
      filters.category = category;
    }
    if (complexity && typeof complexity === 'string') {
      filters.complexity = complexity;
    }

    const motifs = await storage.getMotifs(filters);
    res.json(motifs);
  } catch (error) {
    console.error("Error fetching motifs:", error);
    res.status(500).json({ message: "Failed to fetch motifs" });
  }
});

// GET /api/motifs/:id - Get a single motif by ID
motifsRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid motif ID" });
    }
    const motif = await storage.getMotifById(id);
    if (!motif) {
      return res.status(404).json({ message: "Motif not found" });
    }
    res.json(motif);
  } catch (error) {
    console.error(`Error fetching motif with id ${req.params.id}:`, error);
    res.status(500).json({ message: "Failed to fetch motif" });
  }
});

// POST /api/motifs - Create a new motif (admin only)
motifsRouter.post("/", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const motifData = insertMotifSchema.parse(req.body);
    const newMotif = await storage.createMotif(motifData);
    res.status(201).json(newMotif);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid motif data", errors: error.errors });
    }
    console.error("Error creating motif:", error);
    res.status(500).json({ message: "Failed to create motif" });
  }
});

export { motifsRouter };
