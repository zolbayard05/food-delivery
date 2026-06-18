import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { FoodModel } from "../model/food.model.js";

//CREATE FOOD
export const createFood = async (c: Context) => {
  await connectDb();

  const input = await c.req.json();

  const response = await FoodModel.create({
    foodname: input.foodName,
    price: input.price,
    ingredients: input.ingredients,
    image: input.image,
    category: input.category,
  });

  return c.json({
    mesage: "Amjilttai hool nemlee",
    response,
  });
};

// GET FOOD
export const getFood = async (c: Context) => {
  await connectDb();
  const foods = await FoodModel.find();

  return c.json({ message: "food haruul", foods });
};

//UPDATE FOOD
export const updateFood = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  const input = await c.req.json();

  const updated = await FoodModel.findByIdAndUpdate(id, {
    foodname: input.foodName,
    price: input.price,
    ingredients: input.ingredients,
    image: input.image,
    category: input.category,
  });
  return c.json({ message: "amjilttai update hiilee", updated });
};

//DELETE FOOD
export const deleteFood = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");

  await FoodModel.findByIdAndDelete(id);

  return c.json({
    message: " Amjilttai ustaglaa",
  });
};
