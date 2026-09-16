"use client";

import { FoodCard, FoodType } from "./FoodCard";

export const FoodSection = ({
  categoryName,
  foods,
  categoryId,
  getFoods,
}: {
  categoryName: string;
  foods: (FoodType & { category: string })[];
  categoryId: string;
  getFoods: () => void;
}) => {
  const filteredFoods = foods.filter((food) => food.category === categoryId);

  if (filteredFoods.length === 0) return null;

  return (
    <section id={`category-${categoryId}`} className="scroll-mt-40 py-8">
      <h2 className="mb-5 text-2xl font-bold capitalize text-foreground">
        {categoryName}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {filteredFoods.map((food) => (
          <FoodCard key={food._id} food={food} getFoods={getFoods} />
        ))}
      </div>
    </section>
  );
};
