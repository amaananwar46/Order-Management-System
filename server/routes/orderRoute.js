import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrderHistory,
} from "../controllers/orderController.js";

const router = express.Router();

// Create Order
router.post("/", createOrder);

// (Optional - backward compatibility)
router.post("/createOrder", createOrder);

// Get All Orders
router.get("/", getOrders);

// Order History (ye :id se pehle hona chahiye)
router.get("/:id/history", getOrderHistory);

// Get Single Order
router.get("/:id", getOrderById);

export default router;