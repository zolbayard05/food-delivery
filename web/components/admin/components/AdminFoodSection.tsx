"use client";

import { AdminFoodCard } from "./AdminFoodCard";
import { CreateFoodDialog } from "./CreateFoodDialog";

type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const AdminFoodSection = ({
  categoryName,
  foods,
  categoryId,
  getFoods,
}: {
  categoryName: string;
  foods: FoodType[];
  categoryId: string;
  getFoods: () => void;
}) => {
  const filteredFoods = foods.filter((food) => food.category === categoryId);

  return (
    <div className="w-full rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold capitalize">{categoryName}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <CreateFoodDialog categoryId={categoryId} getFoods={getFoods} />
        {filteredFoods.map((food) => (
          <AdminFoodCard key={food._id} food={food} getFoods={getFoods} />
        ))}
      </div>
    </div>
  );
};
