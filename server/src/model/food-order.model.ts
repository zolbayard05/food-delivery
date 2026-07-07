import { model, Schema } from "mongoose";

const FoodOrderItemSchema = new Schema({
  food: {
    type: Schema.Types.ObjectId,
    ref: "Food",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const FoodOrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    foodOrderItem: {
      type: [FoodOrderItemSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "CANCELED", "DELIVERED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  },
);

export const FoodOrderModel = model("FoodOrder", FoodOrderSchema);
