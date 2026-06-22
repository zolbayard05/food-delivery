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
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddCategoryDialog = ({
  getCategories,
}: {
  getCategories: () => void;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addNewCategory = async () => {
    await axios.post("http://localhost:3000/category", {
      categoryName: value,
    });

    getCategories();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-red-500 h-10">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <h3>Category name</h3>
        <Input onChange={handleChange} placeholder="type category name ..." />
        <DialogClose asChild>
          <Button onClick={addNewCategory}>Add category</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default AddCategoryDialog;
