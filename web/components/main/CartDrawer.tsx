"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CartDrawer = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const cart = useContext(CartContext);
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleConfirmOrder = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Сагс хоосон байна");
      return;
    }

    if (!userContext?.user) {
      toast.error("Захиалга хийхийн тулд эхлээд нэвтэрнэ үү");
      setCartOpen(false);
      router.push("/signin");
      return;
    }

    if (!deliveryAddress.trim()) {
      toast.error("Хүргэлтийн хаягаа оруулна уу");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/order", {
        totalPrice: cart.totalPrice,
        foodOrderItems: cart.items.map((item) => ({
          food: item.food._id,
          quantity: item.quantity,
        })),
        deliveryAddress,
      });

      cart.clearCart();
      setDeliveryAddress("");
      toast.success("Захиалга амжилттай үүслээ");
      setCartOpen(false);
    } catch (error) {
      console.error("Create order error:", error);
      toast.error("Захиалга үүсгэхэд алдаа гарлаа");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Drawer
      direction="right"
      open={cartOpen}
      onOpenChange={setCartOpen}
      modal={true}
      dismissible={true}
    >
      <DrawerTrigger asChild>
        <Button className="rounded-full h-14 w-14 bg-[#F4F4F5] hover:bg-[#f4f4f55f] text-foreground cursor-pointer relative">
          <ShoppingCart color="black" />
          {cart && cart.items.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent style={{ width: 500, maxWidth: "85vw" }}>
        <DrawerHeader>
          <DrawerTitle className="flex gap-2 text-[18px]">
            <ShoppingCart color="black" /> Захиалгын дэлгэрэнгүй
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-4 px-4 overflow-y-auto flex-1">
          {!cart || cart.items.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Сагс хоосон байна.
            </p>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.food._id}
                className="flex items-center gap-3 border rounded-xl p-2"
              >
                <img
                  src={item.food.image}
                  alt={item.food.foodname}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.food.foodname}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.food.price} x {item.quantity} = $
                    {item.food.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() => cart.decrement(item.food._id)}
                  >
                    <Minus size={14} />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    className="h-7 w-7 p-0"
                    onClick={() => cart.increment(item.food._id)}
                  >
                    <Plus size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-7 w-7 p-0 text-red-500"
                    onClick={() => cart.removeItem(item.food._id)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </div>
            ))
          )}

          {cart && cart.items.length > 0 && (
            <>
              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Нийт үнэ</span>
                <span>${cart.totalPrice}</span>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">Хүргэлтийн хаяг</p>
                <Textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Хүргэлтийн хаягаа оруулна уу"
                />
              </div>
            </>
          )}
        </div>

        <DrawerFooter>
          {cart && cart.items.length > 0 && (
            <Button
              onClick={handleConfirmOrder}
              disabled={submitting}
              className="bg-red-500 hover:bg-red-700"
            >
              {submitting ? "Илгээж байна..." : "Захиалга баталгаажуулах"}
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Хаах</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
