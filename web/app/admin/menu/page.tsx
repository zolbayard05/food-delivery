"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
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
  category: string;
};

const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/category");
      setCategories(response.data.foodCategories);
    } catch (error) {
      console.error("Category fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFood = async () => {
    try {
      const response = await api.get("/food");
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
    <div className="min-h-screen w-full px-4 py-6 sm:px-8">
      <h1 className="mb-6 text-2xl font-bold">Хоолны цэс удирдах</h1>

      <div className="w-full space-y-4 rounded-2xl border bg-white p-6">
        <h3 className="text-lg font-semibold">Категори</h3>

        <div className="flex flex-wrap items-center gap-3">
          {loading ? (
            <>
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </>
          ) : (
            categories.map((category) => (
              <CategoryItem
                key={category._id}
                category={category}
                count={foods.filter((f) => f.category === category._id).length}
                getCategories={getCategories}
              />
            ))
          )}

          <AddCategoryDialog getCategories={getCategories} />
        </div>
      </div>

      <div className="mt-4 space-y-4">
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
    </div>
  );
};
export default Page;
