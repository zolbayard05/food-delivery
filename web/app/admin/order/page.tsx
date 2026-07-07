"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  user: {
    email: string;
    phoneNumber: string;
    address: string;
  };
  totalPrice: number;
  foodOrderItems: FoodOrderItem[];
  status: "PENDING" | "CANCELED" | "DELIVERED";
  createdAt: string;
};

const STATUS_STYLES: Record<OrderType["status"], string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  DELIVERED: "bg-green-100 text-green-700 border-green-300",
  CANCELED: "bg-red-100 text-red-600 border-red-300",
};

const STATUS_OPTIONS: OrderType["status"][] = [
  "PENDING",
  "DELIVERED",
  "CANCELED",
];

const Page = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/order");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Order fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: OrderType["status"]) => {
    try {
      await axios.put(`http://localhost:3000/order/${id}`, { status });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o)),
      );
    } catch (error) {
      console.error("aldaa garlaa:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="h-screen w-full bg-secondary overflow-y-auto">
      <div className="w-full rounded-xl m-4 p-6 space-y-4 bg-white">
        <h3 className="text-xl font-semibold">Orders</h3>

        {loading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground text-sm">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Card key={order._id} className="border shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between pb-2 gap-4">
                  {/* Left: user + meta */}
                  <div className="space-y-0.5">
                    <CardTitle className="text-base font-semibold">
                      {order.user?.email ?? "Unknown user"}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {order.user?.phoneNumber}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.user?.address}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Right: status selector + total */}
                  <div className="flex flex-col items-end gap-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value as OrderType["status"],
                        )
                      }
                      className={`text-xs font-medium rounded-full border px-3 py-1 cursor-pointer outline-none ${STATUS_STYLES[order.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
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
