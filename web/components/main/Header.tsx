"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { ClipboardList, User2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CartDrawer from "./CartDrawer";

export const Header = () => {
  const context = useContext(UserContext);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#18181B]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src="/Logo=Horizon.jpg"
            alt="NomNom"
            width={150}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {context?.user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/orders">
              <Button
                variant="ghost"
                className="h-11 w-11 rounded-full bg-[#F4F4F5] p-0 hover:bg-[#e4e4e7] cursor-pointer"
                title="Миний захиалгууд"
              >
                <ClipboardList className="text-[#18181B]" size={20} />
              </Button>
            </Link>

            <CartDrawer />

            <Popover>
              <PopoverTrigger asChild>
                <Button className="h-11 w-11 rounded-full bg-red-500 p-0 hover:bg-red-600 cursor-pointer">
                  <User2 size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56">
                <p className="truncate text-sm font-medium">
                  {context.user.email}
                </p>
                <p className="mb-3 text-xs text-muted-foreground">
                  {context.user.role === "ADMIN" ? "Админ" : "Хэрэглэгч"}
                </p>
                <Button
                  onClick={context.logout}
                  className="w-full"
                  variant="secondary"
                >
                  Гарах
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-3">
            <Link href="/signup">
              <Button className="bg-[#F4F4F5] text-[#18181B] hover:bg-[#e4e4e7] cursor-pointer">
                Бүртгүүлэх
              </Button>
            </Link>
            <Link href="/signin">
              <Button className="bg-red-500 hover:bg-red-600 cursor-pointer">
                Нэвтрэх
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
