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
import { uploudFile } from "@/lib/uploudFile";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CreateFoodDialog = ({
  categoryId,
  getFoods,
}: {
  categoryId: string;
  getFoods: () => void;
}) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [file, setFile] = useState<File>();

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

  const handleFile = (e: any) => {
    const uploudedFile = e.target.files[0];

    setFile(uploudedFile);
  };

  const createFood = async () => {
    try {
      if (!file) {
        console.log("zuragaa oruulna uu");
        return;
      }

      const imageUrl = await uploudFile(file);

      await axios.post("http://localhost:3000/food", {
        foodName: foodName,
        price: price,
        ingredients: ingredients,
        category: categoryId,
        image: imageUrl,
      });

      getFoods();
    } catch (error) {
      console.error("Create food error:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[360px] max-h-[320px] border rounded-2xl border-red-500 border-dashed p-4 gap-5 flex flex-col items-center justify-center ">
      <Dialog>
        <DialogTrigger>
          <Button className="rounded-full bg-red-500 h-10">
            <Plus />
          </Button>
        </DialogTrigger>

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

          <div>
            <p>Image</p>
            <Input onChange={handleFile} type="file"></Input>
          </div>

          <DialogClose asChild>
            <Button onClick={createFood}>add</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <p>Add new food</p>
    </div>
  );
};
