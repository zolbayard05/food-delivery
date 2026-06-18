import { Hono } from "hono";
import {
  createFood,
  deleteFood,
  getFood,
  updateFood,
} from "../controllers/food.controller.js";

const foodRoute = new Hono();

foodRoute.post("/", createFood);
foodRoute.get("/", getFood);
foodRoute.put("/:id", updateFood);
foodRoute.delete("/:id", deleteFood);

export default foodRoute;
