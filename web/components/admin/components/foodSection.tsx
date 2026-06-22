"use client";

import { CreateFoodDialog } from "./CreateFoodDialog";
import FoodCard from "./FoodCard";

const FoodSection = ({
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

      <CreateFoodDialog
        categoryId={categoryId}
        getFoods={getFoods}
      ></CreateFoodDialog>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};
export default FoodSection;
