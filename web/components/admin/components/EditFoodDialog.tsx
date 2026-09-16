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
import { api } from "@/lib/api";
import { FoodType } from "./AdminFoodCard";
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
  const [saving, setSaving] = useState(false);

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
      setSaving(true);
      let finalImage = imageUrl;

      if (file) {
        finalImage = await uploudFile(file);
      }

      await api.put(`/food/${food._id}`, {
        foodName: foodName,
        price: price,
        ingredients: ingredients,
        image: finalImage,
      });

      getFoods();
    } catch (error) {
      console.error("Update food error:", error);
    } finally {
      setSaving(false);
    }
  };

  // DELETE
  const deleteFood = async () => {
    try {
      await api.delete(`/food/${food._id}`);
      getFoods();
    } catch (error) {
      console.error("Delete food error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-9 w-9 rounded-full bg-white p-0 shadow-md hover:bg-white cursor-pointer">
          <Pencil size={15} color="red" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Хоолны мэдээлэл</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Хоолны нэр</p>
            <Input value={foodName} onChange={handleFoodName} type="text" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium">Үнэ</p>
            <Input value={price} onChange={handlePrice} type="number" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium">Орц</p>
            <Input value={ingredients} onChange={handleIngredients} type="text" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium">Зураг</p>
            {preview ? (
              <div className="relative w-full">
                <img
                  src={preview}
                  alt={foodName}
                  className="w-full rounded-2xl object-cover"
                  style={{ height: 140 }}
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
                >
                  <X size={16} color="red" />
                </button>
              </div>
            ) : (
              <Input onChange={handleFile} type="file" />
            )}
          </div>
        </div>

        <DialogClose asChild>
          <div className="flex justify-between pt-2">
            <Button
              onClick={deleteFood}
              variant="outline"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash size={16} className="mr-1" /> Устгах
            </Button>
            <Button
              onClick={updateFood}
              disabled={saving}
              className="bg-red-500 hover:bg-red-600"
            >
              {saving ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
