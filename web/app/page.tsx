"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { AddCategoryDialog } from "@/components/admin/components/AddCategoryDialog";
import { FoodSection } from "@/components/admin/components/foodSection";
import { CategoryItem } from "@/components/admin/components/CategoryItem";

import { Header } from "@/components/main/Header";
import Image from "next/image";

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

export default function Home() {
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
    <div>
      <Header />
      <img src="/main.jpg" alt="main" className="w-full h-250 object-cover" />
      <div className="flex justify-center items-center">
        <div className="h-screen w-full bg-secondary">
          {categories?.map((category) => (
            <FoodSection
              key={category._id}
              getFoods={getFood}
              foods={foods}
              categoryName={category.categoryName}
              categoryId={category._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
