import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { FoodOrderModel } from "../model/food-order.model.js";
import { FoodModel } from "../model/food.model.js";

export const createOrder = async (c: Context) => {
  await connectDb();

  const input = await c.req.json();

  const { user, foodOrderItems } = input;

  let totalPrice = 0;

  foodOrderItems.amp(async (item: { food: string; quantity: number }) => {
    const food = await FoodModel.findById(item.food);

    if (!food) {
      return c.json(
        {
          message: "zahialsan hool baihgui baina",
        },
        400,
      );
    }

    const currentPrice = food!.price! * foodOrderItems.quantity;
    totalPrice += currentPrice;
  });

  const response = await FoodOrderModel.create({
    user,
    foodOrderItem: foodOrderItems,
    totalPrice: totalPrice + 5000,
  });
};
