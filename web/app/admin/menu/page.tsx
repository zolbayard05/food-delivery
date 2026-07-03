"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { AddCategoryDialog } from "@/components/admin/components/AddCategoryDialog";
import { AdminFoodSection } from "@/components/admin/components/AdminFoodSection";
import { CategoryItem } from "@/components/admin/components/CategoryItem";

type CategoryType = {
  categoryName: string;
  _id: string;
};

type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/category");
      setCategories(response.data.foodCategories);
    } catch (error) {
      console.error("Category fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFood = async () => {
    try {
      const response = await axios.get("http://localhost:3000/food");
      setFoods(response.data.foods);
    } catch (error) {
      console.error("Food fetch error:", error);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-screen w-full bg-secondary">
      <div className="w-full rounded-xl m-4 p-6 space-y-4 bg-white">
        <h3 className="text-xl font-semibold">Dishes category</h3>

        <div className="flex gap-4 flex-wrap">
          {loading ? (
            <>
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </>
          ) : (
            categories.map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                getCategories={getCategories}
              />
            ))
          )}

          <AddCategoryDialog getCategories={getCategories} />
        </div>
      </div>

      {categories?.map((category) => (
        <AdminFoodSection
          key={category._id}
          getFoods={getFood}
          foods={foods}
          categoryName={category.categoryName}
          categoryId={category._id}
        />
      ))}
    </div>
  );
};
export default Page;
