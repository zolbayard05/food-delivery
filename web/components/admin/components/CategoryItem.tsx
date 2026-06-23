import { useState } from "react";
import axios from "axios";
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
  getCategories,
}: {
  category: CategoryType;
  getCategories: () => void;
}) => {
  const [value, setValue] = useState(category.categoryName);

  // PUT
  const updateCategory = async () => {
    try {
      await axios.put(`http://localhost:3000/category/${category._id}`, {
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
      await axios.delete(`http://localhost:3000/category/${category._id}`);
      getCategories();
    } catch (error) {
      console.error("Delete category error:", error);
    }
  };

  return (
    <div className="rounded-full py-2 px-4 border flex items-center gap-2">
      {category.categoryName}
      <Badge className="ml-1">5</Badge>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="h-6 w-6 p-0">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
          </DialogHeader>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <DialogClose asChild>
            <Button onClick={updateCategory}>Save</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Button
        variant="ghost"
        className="h-6 w-6 p-0 text-red-500"
        onClick={deleteCategory}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
