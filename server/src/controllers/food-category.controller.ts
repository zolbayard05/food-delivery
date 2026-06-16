import { Context } from "hono";
import { FoodCategoryModel } from "../model/food-category.model.js";
import { connectDb } from "../util/connectDb.js";

//CREATE FOOD CONTROLLER FUNCTION
export const createFoodCategory = async (c: Context) => {
  await connectDb();
  const input = await c.req.json();

  await FoodCategoryModel.create({
    categoryName: input.categoryName,
  });

  return c.json({
    message: "Successfully created food category",
  });
};

// GET FOOD CONTROLLER FUNCTION
export const getFoodCategory = async (c: Context) => {
  await connectDb();
  const foodCategories = await FoodCategoryModel.find();

  return c.json({ message: "Category av", foodCategories });
};

// UPDATE FOOD CONTROLLER FUNCTION
export const updateFoodCategory = async (c: Context) => {
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
};

//DELETE FOOD CONTROLLER FUNCTION
export const deleteFoodCategory = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");

  await FoodCategoryModel.findByIdAndDelete(id);

  return c.json({
    message: "Successfully deleted food category",
  });
};
