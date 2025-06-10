import type { Express } from "express";
import { createServer, type Server } from "http";
// Middleware imports - authenticateJWT is applied globally
import { authenticateJWT } from "./middleware/rbac";

// Router imports
import { authRouter } from './api/auth.routes';
import { categoriesRouter } from './api/categories.routes';
import { designsRouter } from './api/designs.routes';
import { ordersRouter } from './api/orders.routes';
import { testimonialsRouter } from './api/testimonials.routes';
import { motifsRouter } from './api/motifs.routes'; // Import motifsRouter

// Note: JWT_SECRET and other specific dependencies like bcrypt, specific schemas (insertUserSchema, authSchema, insertOrderSchema),
// z from zod, and storage are now primarily handled within their respective route modules (e.g., auth.routes.ts, orders.routes.ts).
// This keeps server/routes.ts cleaner and focused on route registration and global middleware.

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply JWT authentication middleware globally
  // This will make req.user available if a valid token is sent,
  // but will not fail requests for public routes if no token is present.
  app.use(authenticateJWT);

  // Mount the routers
  app.use("/api/auth", authRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/designs", designsRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/testimonials", testimonialsRouter);
  app.use("/api/motifs", motifsRouter); // Mount motifsRouter

  // All individual route definitions previously here have been moved to their respective router files in server/api/

  const httpServer = createServer(app);
  return httpServer;
}
