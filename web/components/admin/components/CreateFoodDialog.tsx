import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export const CreateFoodDialog = ({
  categoryId,
  getFood,
}: {
  categoryId: string;
  getFood: () => void;
}) => {
  const [foodName, setfoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleFoodName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setfoodName(value);
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPrice(value);
  };

  const handleIngredients = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setIngredients(value);
  };

  const createFood = async () => {
    const response = await axios.post("http://localhost:3000/food", {
      foodName: foodName,
      price: price,
      ingredients: ingredients,
      category: categoryId,
      image: "",
    });
    getFood();
  };

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>create food</DialogTitle>
        </DialogHeader>
        <div>
          <p>Food name</p>
          <Input onChange={handleFoodName} type="text"></Input>
        </div>

        <div>
          <p>Price</p>
          <Input onChange={handlePrice} type="number"></Input>
        </div>

        <div>
          <p>Ingridients</p>
          <Input onChange={handleIngredients} type="text"></Input>
        </div>
        <DialogClose asChild>
          <Button onClick={createFood}>add</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
