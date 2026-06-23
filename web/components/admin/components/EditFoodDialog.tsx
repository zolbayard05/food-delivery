import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { FoodType } from "./FoodCard";

export const EditFoodDialog = ({
  food,
  getFoods,
}: {
  food: FoodType;
  getFoods: () => void;
}) => {
  const [foodName, setFoodName] = useState(food.foodname);
  const [price, setPrice] = useState(String(food.price));
  const [ingredients, setIngredients] = useState(food.ingredients);

  const handleFoodName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFoodName(value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPrice(value);
  };

  const handleIngredients = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setIngredients(value);
  };

  // PUT
  const updateFood = async () => {
    try {
      await axios.put(`http://localhost:3000/food/${food._id}`, {
        foodName: foodName,
        price: price,
        ingredients: ingredients,
        image: "",
      });

      getFoods();
    } catch (error) {
      console.error("Update food error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>edit food</DialogTitle>
        </DialogHeader>

        <div>
          <p>Food name</p>
          <Input onChange={handleFoodName} type="text" />
        </div>

        <div>
          <p>Price</p>
          <Input onChange={handlePrice} type="number" />
        </div>

        <div>
          <p>Ingredients</p>
          <Input onChange={handleIngredients} type="text" />
        </div>

        <DialogClose asChild>
          <Button onClick={updateFood}>save</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
