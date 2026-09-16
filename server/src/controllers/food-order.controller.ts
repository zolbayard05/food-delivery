import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { FoodOrderModel } from "../model/food-order.model.js";

// GET ALL ORDERS (admin)
export const getOrders = async (c: Context) => {
  await connectDb();
  const orders = await FoodOrderModel.find()
    .populate("user", "email phoneNumber address")
    .populate("foodOrderItems.food", "foodname price image")
    .sort({ createdAt: -1 });
  return c.json({ message: "Orders fetched", orders });
};

// GET MY ORDERS (authenticated user)
export const getMyOrders = async (c: Context) => {
  await connectDb();
  const userId = c.get("userId");

  const orders = await FoodOrderModel.find({ user: userId })
    .populate("foodOrderItems.food", "foodname price image")
    .sort({ createdAt: -1 });

  return c.json({ message: "Orders fetched", orders });
};

// GET SINGLE ORDER (admin)
export const getOrderById = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  const order = await FoodOrderModel.findById(id)
    .populate("user", "email phoneNumber address")
    .populate("foodOrderItems.food", "foodname price image");
  if (!order) return c.json({ message: "Order not found" }, 404);
  return c.json({ message: "Order fetched", order });
};

// CREATE ORDER (authenticated user)
export const createOrder = async (c: Context) => {
  await connectDb();
  const userId = c.get("userId");
  const input = await c.req.json();

  if (!input.foodOrderItems || input.foodOrderItems.length === 0) {
    return c.json({ message: "Sagsand hool baihgui baina" }, 400);
  }

  if (!input.deliveryAddress) {
    return c.json({ message: "Hurgeltiin hayagaa oruulna uu" }, 400);
  }

  const order = await FoodOrderModel.create({
    user: userId,
    totalPrice: input.totalPrice,
    foodOrderItems: input.foodOrderItems,
    deliveryAddress: input.deliveryAddress,
  });

  return c.json({ message: "Order created", order }, 201);
};

// UPDATE ORDER STATUS (admin)
export const updateOrderStatus = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  const input = await c.req.json();
  const updated = await FoodOrderModel.findByIdAndUpdate(
    id,
    { status: input.status },
    { new: true },
  );
  return c.json({ message: "Order status updated", updated });
};

// DELETE ORDER (admin)
export const deleteOrder = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  await FoodOrderModel.findByIdAndDelete(id);
  return c.json({ message: "Order deleted" });
};
