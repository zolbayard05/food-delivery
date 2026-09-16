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
import { uploudFile } from "@/lib/uploudFile";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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
  };

  const createFood = async () => {
    try {
      if (!file) {
        toast.error("Зургаа оруулна уу");
        return;
      }

      setSaving(true);
      const imageUrl = await uploudFile(file);

      await api.post("/food", {
        foodName: foodName,
        price: price,
        ingredients: ingredients,
        category: categoryId,
        image: imageUrl,
      });

      getFoods();
    } catch (error) {
      console.error("Create food error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-red-300 text-muted-foreground transition-colors hover:border-red-500 hover:text-red-500 cursor-pointer">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
            <Plus size={18} />
          </span>
          <span className="text-sm font-medium">Шинэ хоол нэмэх</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ хоол нэмэх</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <p className="text-sm font-medium">Хоолны нэр</p>
            <Input onChange={handleFoodName} type="text" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium">Үнэ</p>
            <Input onChange={handlePrice} type="number" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium">Орц</p>
            <Input onChange={handleIngredients} type="text" />
          </div>

          <div className="space-y-1.5">
            <p className="text-sm font-medium">Зураг</p>
            <Input onChange={handleFile} type="file" />
          </div>
        </div>

        <DialogClose asChild>
          <Button
            onClick={createFood}
            disabled={saving}
            className="w-full bg-red-500 hover:bg-red-600"
          >
            {saving ? "Нэмж байна..." : "Нэмэх"}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
