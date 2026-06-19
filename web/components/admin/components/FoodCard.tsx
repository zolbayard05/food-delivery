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

export type FoodType = {
  foodname: string;
  _id: string;
  price: number;
  image: string;
  ingredients: string;
};

const FoodCard = ({ food }: { food: FoodType }) => {
  return (
    <Card className="mx-auto w-full max-w-[360] max-h-[300]  p-4 gap-2">
      <div className="relative ">
        <img
          src={food.image}
          alt={food.foodname}
          className=" w-full object-cover rounded-2xl"
          style={{ width: 340, height: 200 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button>edit</Button>
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

export default FoodCard;
