import { Hono } from "hono";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategory,
  updateFoodCategory,
} from "../controllers/food-category.controller.js";
import { adminMiddleware } from "../middleware/auth.js";

const foodCategoryRoute = new Hono();

foodCategoryRoute.post("/", adminMiddleware, createFoodCategory);
foodCategoryRoute.get("/", getFoodCategory);
foodCategoryRoute.put("/:id", adminMiddleware, updateFoodCategory);
foodCategoryRoute.delete("/:id", adminMiddleware, deleteFoodCategory);

export default foodCategoryRoute;
