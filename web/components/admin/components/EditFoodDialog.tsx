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
import { uploudFile } from "@/lib/uploudFile";
import { Pencil, Trash, X } from "lucide-react";

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
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState(food.image);
  const [preview, setPreview] = useState(food.image);

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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploudedFile = e.target.files?.[0];
    if (!uploudedFile) return;

    setFile(uploudedFile);
    setPreview(URL.createObjectURL(uploudedFile));
  };

  const removeImage = () => {
    setFile(undefined);
    setImageUrl("");
    setPreview("");
  };

  // PUT
  const updateFood = async () => {
    try {
      let finalImage = imageUrl;

      if (file) {
        finalImage = await uploudFile(file);
      }

      await axios.put(`http://localhost:3000/food/${food._id}`, {
        foodName: foodName,
        price: price,
        ingredients: ingredients,
        image: finalImage,
      });

      getFoods();
    } catch (error) {
      console.error("Update food error:", error);
    }
  };

  // DELETE
  const deleteFood = async () => {
    try {
      await axios.delete(`http://localhost:3000/food/${food._id}`);
      getFoods();
    } catch (error) {
      console.error("Delete food error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-white h-10">
          <Pencil color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dish info</DialogTitle>
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

        <div>
          <p>Image</p>
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt={foodName}
                className="w-full object-cover rounded-2xl"
                style={{ height: 140 }}
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 rounded-full bg-white p-1 shadow"
              >
                <X size={16} color="red" />
              </button>
            </div>
          ) : (
            <Input onChange={handleFile} type="file" />
          )}
        </div>

        <DialogClose asChild>
          <div className="flex justify-between">
            <Button onClick={deleteFood} className="bg-red-500">
              <Trash />
            </Button>
            <Button onClick={updateFood}>save</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
