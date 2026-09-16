"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { Header } from "@/components/main/Header";
import { CategoryNav } from "@/components/main/CategoryNav";
import { FoodSection } from "@/components/main/FoodSection";

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

export default function Home() {
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
    <div className="min-h-screen bg-white">
      <Header />

      <div className="relative h-[220px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
        <img
          src="/main.jpg"
          alt="NomNom"
          className="h-full w-full object-cover"
        />
      </div>

      {loading ? (
        <div className="mx-auto flex max-w-7xl gap-2 px-4 py-4 sm:px-8 lg:px-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
          ))}
        </div>
      ) : (
        <CategoryNav categories={categories} />
      )}

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 lg:px-12">
        {categories?.map((category) => (
          <FoodSection
            key={category._id}
            getFoods={getFood}
            foods={foods}
            categoryName={category.categoryName}
            categoryId={category._id}
          />
        ))}
      </main>
    </div>
  );
}
