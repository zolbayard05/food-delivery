"use client";

import { Header } from "@/components/main/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/UserContext";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

type FoodOrderItem = {
  food: {
    _id: string;
    foodname: string;
    price: number;
    image: string;
  };
  quantity: number;
};

type OrderType = {
  _id: string;
  totalPrice: number;
  deliveryAddress: string;
  foodOrderItems: FoodOrderItem[];
  status: "PENDING" | "CANCELED" | "DELIVERED";
  createdAt: string;
};

const STATUS_STYLES: Record<OrderType["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  DELIVERED: "bg-green-100 text-green-700 border-green-300",
  CANCELED: "bg-red-100 text-red-600 border-red-300",
};

const STATUS_LABEL: Record<OrderType["status"], string> = {
  PENDING: "Хүлээгдэж байна",
  DELIVERED: "Хүргэгдсэн",
  CANCELED: "Цуцлагдсан",
};

const Page = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/order/my");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("My orders fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (context && context.user === undefined) {
      const stored = localStorage.getItem("user");
      if (!stored) {
        router.push("/signin");
        return;
      }
    }
    getMyOrders();
  }, [context?.user]);

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold">Миний захиалгууд</h2>

        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Одоогоор захиалга байхгүй байна.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Card key={order._id} className="border shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between pb-2 gap-4">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base font-semibold">
                      {new Date(order.createdAt).toLocaleString()}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {order.deliveryAddress}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs font-medium rounded-full border px-3 py-1 ${STATUS_STYLES[order.status]}`}
                    >
                      {STATUS_LABEL[order.status]}
                    </span>
                    <span className="text-sm font-bold text-red-500">
                      ${order.totalPrice}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-3">
                    {order.foodOrderItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-xl border bg-secondary px-3 py-2"
                      >
                        {item.food?.image && (
                          <img
                            src={item.food.image}
                            alt={item.food.foodname}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium leading-tight">
                            {item.food?.foodname ?? "Unknown food"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            x{item.quantity} · ${item.food?.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
