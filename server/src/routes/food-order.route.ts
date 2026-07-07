import { Hono } from "hono";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/food-order.controller.js";

const foodOrderRoute = new Hono();

foodOrderRoute.get("/", getOrders);
foodOrderRoute.get("/:id", getOrderById);
foodOrderRoute.post("/", createOrder);
foodOrderRoute.put("/:id", updateOrderStatus);
foodOrderRoute.delete("/:id", deleteOrder);

export default foodOrderRoute;
