"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export type CartFoodType = {
  _id: string;
  foodname: string;
  price: number;
  image: string;
};

export type CartItemType = {
  food: CartFoodType;
  quantity: number;
};

type CartContextType = {
  items: CartItemType[];
  addToCart: (food: CartFoodType) => void;
  increment: (foodId: string) => void;
  decrement: (foodId: string) => void;
  removeItem: (foodId: string) => void;
  clearCart: () => void;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {}
  }, []);

  const persist = (next: CartItemType[]) => {
    setItems(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const addToCart = (food: CartFoodType) => {
    const existing = items.find((item) => item.food._id === food._id);

    if (existing) {
      persist(
        items.map((item) =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      persist([...items, { food, quantity: 1 }]);
    }
  };

  const increment = (foodId: string) => {
    persist(
      items.map((item) =>
        item.food._id === foodId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decrement = (foodId: string) => {
    persist(
      items
        .map((item) =>
          item.food._id === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (foodId: string) => {
    persist(items.filter((item) => item.food._id !== foodId));
  };

  const clearCart = () => {
    persist([]);
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        increment,
        decrement,
        removeItem,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
