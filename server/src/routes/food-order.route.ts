import { Hono } from "hono";
import {
  getOrders,
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/food-order.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const foodOrderRoute = new Hono();

foodOrderRoute.get("/my", authMiddleware, getMyOrders);
foodOrderRoute.get("/", adminMiddleware, getOrders);
foodOrderRoute.get("/:id", adminMiddleware, getOrderById);
foodOrderRoute.post("/", authMiddleware, createOrder);
foodOrderRoute.put("/:id", adminMiddleware, updateOrderStatus);
foodOrderRoute.delete("/:id", adminMiddleware, deleteOrder);

export default foodOrderRoute;
