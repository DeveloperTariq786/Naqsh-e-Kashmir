import { Router, type Request } from 'express'; // Using Express Request for public routes initially
import { storage } from '../storage'; // Adjusted path
// import { authorizeRole, AuthenticatedRequest } from '../middleware/rbac'; // For future admin routes

const designsRouter = Router();

// Public routes for designs
// GET /api/designs
designsRouter.get("/", async (req: Request, res) => { // req can be AuthenticatedRequest if needed for optional auth features
  try {
    const filters = {
      categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
      priceMin: req.query.priceMin ? parseInt(req.query.priceMin as string) : undefined,
      priceMax: req.query.priceMax ? parseInt(req.query.priceMax as string) : undefined,
      sortBy: req.query.sortBy as 'popular' | 'newest' | 'price_asc' | 'price_desc' | undefined
    };

    const designs = await storage.getDesigns(filters);
    res.json(designs);
  } catch (error) {
    console.error("Fetch designs error:", error);
    res.status(500).json({ message: "Failed to fetch designs" });
  }
});

// GET /api/designs/featured
designsRouter.get("/featured", async (req, res) => {
  try {
    const designs = await storage.getFeaturedDesigns();
    res.json(designs);
  } catch (error) {
    console.error("Fetch featured designs error:", error);
    res.status(500).json({ message: "Failed to fetch featured designs" });
  }
});

// GET /api/designs/category/:categoryId
designsRouter.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const designs = await storage.getDesignsByCategory(categoryId);
    res.json(designs);
  } catch (error) {
    console.error("Fetch designs by category error:", error);
    res.status(500).json({ message: "Failed to fetch designs by category" });
  }
});

// GET /api/designs/:id
designsRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const design = await storage.getDesignById(id);
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }
    res.json(design);
  } catch (error) {
    console.error("Fetch design by id error:", error);
    res.status(500).json({ message: "Failed to fetch design" });
  }
});


/*
// Example: Secure design creation (POST) and modification/deletion (PUT, DELETE) routes for admin
designsRouter.post("/", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  // Implementation for creating a design
  // const newDesignData = req.body;
  // const design = await storage.createDesign(newDesignData); // Assuming storage.createDesign takes validated data
  // res.status(201).json(design);
  res.status(501).json({ message: "Not implemented" });
});

designsRouter.put("/:id", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  // Implementation for updating a design
  // const designId = parseInt(req.params.id);
  // const updatedDesignData = req.body;
  // const design = await storage.updateDesign(designId, updatedDesignData); // Assuming storage.updateDesign exists
  // if (!design) return res.status(404).json({ message: "Design not found" });
  // res.json(design);
  res.status(501).json({ message: "Not implemented" });
});

designsRouter.delete("/:id", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  // Implementation for deleting a design
  // const designId = parseInt(req.params.id);
  // await storage.deleteDesign(designId); // Assuming storage.deleteDesign exists
  // res.status(204).send();
  res.status(501).json({ message: "Not implemented" });
});
*/

export { designsRouter };
