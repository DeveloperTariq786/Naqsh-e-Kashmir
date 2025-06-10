import { Router } from 'express';
import { storage } from '../storage'; // Adjusted path
// import { authorizeRole, AuthenticatedRequest } from '../middleware/rbac'; // For future admin routes

const categoriesRouter = Router();

// Public routes for categories
// GET /api/categories
categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await storage.getCategories();
    res.json(categories);
  } catch (error) {
    console.error("Fetch categories error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// GET /api/categories/:slug
categoriesRouter.get("/:slug", async (req, res) => {
  try {
    const category = await storage.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.error("Fetch category by slug error:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
});

/*
// Example: Secure category creation (POST) and modification/deletion (PUT, DELETE) routes for admin
categoriesRouter.post("/", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  // Implementation for creating a category
  // const newCategoryData = req.body;
  // const category = await storage.createCategory(newCategoryData);
  // res.status(201).json(category);
  res.status(501).json({ message: "Not implemented" });
});

categoriesRouter.put("/:id", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  // Implementation for updating a category
  // const categoryId = parseInt(req.params.id);
  // const updatedCategoryData = req.body;
  // const category = await storage.updateCategory(categoryId, updatedCategoryData); // Assuming storage.updateCategory exists
  // if (!category) return res.status(404).json({ message: "Category not found" });
  // res.json(category);
  res.status(501).json({ message: "Not implemented" });
});

categoriesRouter.delete("/:id", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  // Implementation for deleting a category
  // const categoryId = parseInt(req.params.id);
  // await storage.deleteCategory(categoryId); // Assuming storage.deleteCategory exists
  // res.status(204).send();
  res.status(501).json({ message: "Not implemented" });
});
*/

export { categoriesRouter };
