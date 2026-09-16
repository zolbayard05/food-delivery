import { EditFoodDialog } from "./EditFoodDialog";

export type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

export const AdminFoodCard = ({
  food,
  getFoods,
}: {
  food: FoodType;
  getFoods: () => void;
}) => {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 overflow-hidden bg-secondary">
        <img
          src={food.image}
          alt={food.foodname}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-2 top-2">
          <EditFoodDialog food={food} getFoods={getFoods} />
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-red-500 line-clamp-1">
            {food.foodname}
          </h4>
          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold">
            ${food.price}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};
