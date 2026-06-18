"use client";

import axios from "axios";
import { useEffect, useState } from "react";

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
      <div>
        {foods.map((food) => {
          return (
            <div
              key={food._id}
              className="flex gap-2 rounded-2xl py-2 px-4 border"
            >
              {food.foodname}
              {food.price}
              {food.image}
              {food.ingredients}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FoodSection;
