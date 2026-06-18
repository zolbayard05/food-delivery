"use client";

import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import AddCategoryDialog from "@/components/admin/components/AddCategoryDialog";
import FoodSection from "@/components/admin/components/foodSection";

type CategoryType = {
  categoryName: string;
  _id: string;
};

const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/category");

    console.log("working...", response);

    setCategories(response.data.foodCategories);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-screen w-full bg-secondary">
      <div className="w-full rounded-xl m-4 p-6 space-y-4 bg-white">
        <h3 className="text-xl font-semibold">Dishes category</h3>

        <div className="flex gap-4">
          {loading ? (
            <>
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </>
          ) : (
            categories.map((category) => {
              return (
                <div
                  key={category._id}
                  className="rounded-full py-2 px-4 border"
                >
                  {category.categoryName}
                  <Badge className="ml-2">5</Badge>
                </div>
              );
            })
          )}

          <AddCategoryDialog getCategories={getCategories} />
        </div>
      </div>
      <FoodSection></FoodSection>
    </div>
  );
};
export default Page;
