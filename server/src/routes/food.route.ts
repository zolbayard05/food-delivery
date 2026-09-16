import { Hono } from "hono";
import {
  createFood,
  deleteFood,
  getFood,
  updateFood,
} from "../controllers/food.controller.js";
import { adminMiddleware } from "../middleware/auth.js";

const foodRoute = new Hono();

foodRoute.post("/", adminMiddleware, createFood);
foodRoute.get("/", getFood);
foodRoute.put("/:id", adminMiddleware, updateFood);
foodRoute.delete("/:id", adminMiddleware, deleteFood);

export default foodRoute;
