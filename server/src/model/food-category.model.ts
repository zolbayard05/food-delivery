import { model, Schema } from "mongoose";

const FoodCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

export const FoodCategoryModel = model("foodCategory", FoodCategorySchema);
