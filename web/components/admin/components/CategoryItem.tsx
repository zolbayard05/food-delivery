import { useState } from "react";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";

type CategoryType = {
  categoryName: string;
  _id: string;
};

export const CategoryItem = ({
  category,
  count,
  getCategories,
}: {
  category: CategoryType;
  count: number;
  getCategories: () => void;
}) => {
  const [value, setValue] = useState(category.categoryName);

  // PUT
  const updateCategory = async () => {
    try {
      await api.put(`/category/${category._id}`, {
        categoryName: value,
      });
      getCategories();
    } catch (error) {
      console.error("Update category error:", error);
    }
  };

  // DELETE
  const deleteCategory = async () => {
    try {
      await api.delete(`/category/${category._id}`);
      getCategories();
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full border bg-white py-2 pl-4 pr-2 capitalize">
      {category.categoryName}
      <Badge className="bg-secondary text-secondary-foreground">{count}</Badge>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="h-7 w-7 rounded-full p-0">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Категори засах</DialogTitle>
          </DialogHeader>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <DialogClose asChild>
            <Button onClick={updateCategory} className="bg-red-500 hover:bg-red-600">
              Хадгалах
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        className="h-7 w-7 rounded-full p-0 text-red-500 hover:text-red-600"
        onClick={deleteCategory}
      >
        <Trash className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
