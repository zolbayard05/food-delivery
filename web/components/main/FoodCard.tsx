"use client";

import { CartContext } from "@/context/CartContext";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { toast } from "sonner";

export type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

export const FoodCard = ({
  food,
}: {
  food: FoodType;
  getFoods: () => void;
}) => {
  const cart = useContext(CartContext);

  const handleAddToCart = () => {
    cart?.addToCart({
      _id: food._id,
      foodname: food.foodname,
      price: food.price,
      image: food.image,
    });
    toast.success(`${food.foodname} сагсанд нэмэгдлээ`);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        <img
          src={food.image}
          alt={food.foodname}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-red-500 p-0 shadow-md hover:bg-red-600 cursor-pointer"
        >
          <Plus size={18} />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground line-clamp-1">
            {food.foodname}
          </h3>
          <span className="shrink-0 font-bold text-red-500">
            ${food.price}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};
