import { Hono } from "hono";
import { Schema, model } from "mongoose";
import { connectDb } from "./util/connectDb.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

const FoodCategorySchema = new Schema({
  categoryName: { type: String, required: true },
});

const FoodCategoryModel = model("foodCategory", FoodCategorySchema);

app.post("/category", async (c) => {
  await connectDb();
  const input = await c.req.json();

  await FoodCategoryModel.create({ categoryName: input.categoryName });

  return c.json({ message: "Successfully created food category" });
});

app.get("/category", async (c) => {
  await connectDb();
  const foodCategories = await FoodCategoryModel.find();

  return c.json({ message: "Category av", foodCategories });
});

app.put("/category/:id", async (c) => {
  await connectDb();
  const id = c.req.param("id");
  const input = await c.req.json();

  const updated = await FoodCategoryModel.findByIdAndUpdate(id, {
    categoryName: input.categoryName,
  });

  return c.json({
    message: "Successfully updated food category",
    updated,
  });
});

app.delete("/category/:id", async (c) => {
  await connectDb();
  const id = c.req.param("id");

  await FoodCategoryModel.findByIdAndDelete(id);

  return c.json({
    message: "Successfully deleted food category",
  });
});

export default app;
