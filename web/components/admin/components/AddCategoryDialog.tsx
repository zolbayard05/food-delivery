import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Plus } from "lucide-react";
import { useState } from "react";

export const AddCategoryDialog = ({
  getCategories,
}: {
  getCategories: () => void;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addNewCategory = async () => {
    await api.post("/category", {
      categoryName: value,
    });

    getCategories();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 w-10 rounded-full bg-red-500 p-0 hover:bg-red-600 cursor-pointer">
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Шинэ категори нэмэх</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p className="text-sm font-medium">Категорийн нэр</p>
          <Input onChange={handleChange} placeholder="жишээ нь: Salads" />
        </div>
        <DialogClose asChild>
          <Button onClick={addNewCategory} className="w-full bg-red-500 hover:bg-red-600">
            Нэмэх
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
