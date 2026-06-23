import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
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
  // DELETE
  const deleteFood = async () => {
    try {
      await axios.delete(`http://localhost:3000/food/${food._id}`);
      getFoods();
    } catch (error) {
      console.error("Delete food error:", error);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-[360px] max-h-[320px] p-4 gap-2">
      <div className="relative">
        <img
          src={food.image}
          alt={food.foodname}
          className="w-full object-cover rounded-2xl"
          style={{ width: 340, height: 200 }}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <EditFoodDialog food={food} getFoods={getFoods} />

          <Button onClick={deleteFood} className="bg-red-500">
            delete
          </Button>
        </div>
      </div>
      <div>
        <CardHeader className="flex justify-between">
          <CardTitle className="text-red-500">{food.foodname}</CardTitle>
          <Badge>${food.price}</Badge>
        </CardHeader>
        <CardContent>
          <CardDescription>{food.ingredients}</CardDescription>
        </CardContent>
        <CardFooter></CardFooter>
      </div>
    </Card>
  );
};
