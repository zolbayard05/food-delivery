import { Hono } from "hono";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategory,
  updateFoodCategory,
} from "../controllers/food-category.controller.js";

const foodCategoryRoute = new Hono();

foodCategoryRoute.post("/", createFoodCategory);
foodCategoryRoute.get("/", getFoodCategory);
foodCategoryRoute.put("/:id", updateFoodCategory);
foodCategoryRoute.delete("/:id", deleteFoodCategory);

export default foodCategoryRoute;
