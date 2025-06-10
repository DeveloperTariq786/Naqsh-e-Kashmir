import { Router } from 'express';
import { z } from 'zod';
import { storage } from '../storage'; // Adjusted path
import { insertOrderSchema } from '@shared/schema';
import { authorizeRole, type AuthenticatedRequest } from '../middleware/rbac'; // Adjusted path

const ordersRouter = Router();

// POST /api/orders
ordersRouter.post("/", authorizeRole(['user', 'admin']), async (req: AuthenticatedRequest, res) => {
  try {
    // Validate the main part of the request body
    const parsedBody = insertOrderSchema.parse(req.body);

    // Initialize finalOrderData with parsed body. It conforms to InsertOrder.
    // userId is optional in InsertOrder due to nullable field in DB.
    let finalOrderData: typeof insertOrderSchema._input = { ...parsedBody };

    if (req.user) {
      finalOrderData.userId = req.user.id;
    } else if (req.body.userId) {
      // If running an older setup or admin specifies userId and not logged in via token for some reason.
      // However, authorizeRole should ensure req.user is present.
      // This case is less likely with authorizeRole(['user', 'admin']).
      // Consider if admin should be able to set userId directly if it's not their own.
      // For now, if req.user is present, it overrides anything in req.body.userId.
      // If req.user is not present (which authorizeRole prevents), then parsedBody.userId would be used if provided.
    }

    // Re-validate if you've significantly changed structure or added fields not in original schema
    // For just adding userId (which is part of the schema now), this direct assignment is okay.
    // If finalOrderData added fields NOT in insertOrderSchema, you'd parse finalOrderData again.
    // const validatedFinalOrderData = insertOrderSchema.parse(finalOrderData);
    // The line above is not strictly needed if finalOrderData still matches InsertOrder type after adding userId.

    const order = await storage.createOrder(finalOrderData);
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid order data", errors: error.errors });
    }
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// GET /api/orders/track/:email/:phone (Public - does not use AuthenticatedRequest or RBAC directly)
ordersRouter.get("/track/:email/:phone", async (req, res) => {
  try {
    const { email, phone } = req.params;
    const orders = await storage.getOrderByEmailAndPhone(email, phone);
    res.json(orders);
  } catch (error) {
    console.error("Track order error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// GET /api/orders/:orderId
ordersRouter.get("/:orderId", authorizeRole(['user', 'admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await storage.getOrder(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // req.user is guaranteed to be present by authorizeRole
    if (req.user!.role !== 'admin' && order.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden: You do not have permission to view this order." });
    }

    res.json(order);
  } catch (error) {
    console.error("Fetch order by id error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});


// PATCH /api/orders/:orderId/status
ordersRouter.patch("/:orderId/status", authorizeRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const { status, trackingId } = req.body;
    // Basic validation (can be expanded with Zod)
    if (typeof status !== 'string') {
        return res.status(400).json({ message: "Invalid status format" });
    }
    if (trackingId !== undefined && typeof trackingId !== 'string') {
        return res.status(400).json({ message: "Invalid trackingId format" });
    }

    const order = await storage.updateOrderStatus(req.params.orderId, status, trackingId);
    if (!order) {
      return res.status(404).json({ message: "Order not found or failed to update" });
    }
    res.json(order);
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});

export { ordersRouter };
