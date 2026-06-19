"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

const FoodSection = () => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getFood = async () => {
    const response = await axios.get("http://localhost:3000/food");

    console.log("working...", response);

    setFoods(response.data.foods);
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="w-full rounded-xl m-4 p-6 space-y-4 bg-white">
      <h3 className="text-xl font-semibold">Main dishes</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};
export default FoodSection;
