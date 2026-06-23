"use client";

import { CreateFoodDialog } from "./CreateFoodDialog";
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
    <div className="w-full rounded-xl m-4 p-6 space-y-4 bg-white">
      <h3 className="text-xl font-semibold">{categoryName}</h3>
      <div className="flex gap-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <CreateFoodDialog
            categoryId={categoryId}
            getFoods={getFoods}
          ></CreateFoodDialog>
          {filteredFoods.map((food: any) => (
            <FoodCard key={food._id} food={food} getFoods={getFoods} />
          ))}
        </div>
      </div>
    </div>
  );
};
