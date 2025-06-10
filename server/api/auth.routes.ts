import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { storage } from '../storage'; // Adjusted path
import { insertUserSchema, type InsertUser } from '@shared/schema';
// JWT_SECRET should ideally be managed via a centralized config or environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

// Schema for signup and login (consistent with original routes.ts)
const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const authRouter = Router();

// POST /api/auth/signup
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUserInput: InsertUser = {
      email,
      passwordHash,
      role: 'user', // Default role
    };

    // Validate against the more comprehensive insertUserSchema before db operation
    const validatedUserInput = insertUserSchema.parse(newUserInput);

    const user = await storage.createUser(validatedUserInput);

    // Exclude passwordHash from the response
    const { passwordHash: _, ...userResponse } = user;
    res.status(201).json(userResponse);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input", errors: error.errors });
    }
    console.error("Signup error:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

// POST /api/auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input", errors: error.errors });
    }
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

export { authRouter };
