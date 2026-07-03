"use client";

import { FoodCard } from "./FoodCard";

export const FoodSection = ({
  categoryName,
  foods,
  categoryId,
  getFoods,
}: {
  categoryName: string;
  foods: any;
  categoryId: string;
  getFoods: () => void;
}) => {
  const filteredFoods = foods.filter(
    (food: any) => food.category === categoryId,
  );

  return (
    <div className="w-full rounded-xl flex flex-col gap-15 m-10 pl-10 px-10">
      <h3 className="text-2xl font-semibold text-white">{categoryName}</h3>
      <div className="flex gap-4">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4    ">
          {filteredFoods.map((food: any) => (
            <FoodCard key={food._id} food={food} getFoods={getFoods} />
          ))}
        </div>
      </div>
    </div>
  );
};
