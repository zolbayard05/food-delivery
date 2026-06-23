import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditFoodDialog } from "./EditFoodDialog";

export type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

export const FoodCard = ({
  food,
  getFoods,
}: {
  food: FoodType;
  getFoods: () => void;
}) => {
  return (
    <Card className="mx-auto w-full max-w-[280px] max-h-[245px] p-4 ">
      <div className="relative ">
        <img
          src={food.image}
          alt={food.foodname}
          className="w-full object-cover rounded-2xl"
          style={{ width: 250, height: 140 }}
        />
        <div className="absolute inset-0 flex pt-22 pl-48">
          <EditFoodDialog food={food} getFoods={getFoods} />
        </div>
      </div>
      <div>
        <CardHeader className="flex justify-between p-0">
          <CardTitle className="text-red-500 ">{food.foodname}</CardTitle>
          <Badge>${food.price}</Badge>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription>{food.ingredients}</CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </div>
    </Card>
  );
};
