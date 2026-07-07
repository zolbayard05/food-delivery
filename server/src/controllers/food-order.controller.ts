import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { FoodOrderModel } from "../model/food-order.model.js";

// GET ALL ORDERS
export const getOrders = async (c: Context) => {
  await connectDb();
  const orders = await FoodOrderModel.find()
    .populate("user", "email phoneNumber address")
    .populate("foodOrderItems.food", "foodname price image");
  return c.json({ message: "Orders fetched", orders });
};

// GET SINGLE ORDER
export const getOrderById = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  const order = await FoodOrderModel.findById(id)
    .populate("user", "email phoneNumber address")
    .populate("foodOrderItems.food", "foodname price image");
  if (!order) return c.json({ message: "Order not found" }, 404);
  return c.json({ message: "Order fetched", order });
};

// CREATE ORDER
export const createOrder = async (c: Context) => {
  await connectDb();
  const input = await c.req.json();
  const order = await FoodOrderModel.create({
    user: input.user,
    totalPrice: input.totalPrice,
    foodOrderItems: input.foodOrderItems,
    status: input.status,
  });
  return c.json({ message: "Order created", order }, 201);
};

// UPDATE ORDER STATUS
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

// DELETE ORDER
export const deleteOrder = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  await FoodOrderModel.findByIdAndDelete(id);
  return c.json({ message: "Order deleted" });
};
