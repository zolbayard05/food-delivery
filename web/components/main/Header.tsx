"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { LocationEdit, ShoppingCart, User2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Header = () => {
  const context = useContext(UserContext);

  return (
    <div className="w-full h-25 bg-[#18181B] flex justify-between items-center py-3 px-28">
      <div>
        <Image
          src="/Logo=Horizon.jpg"
          alt="Main-logo"
          width={180}
          height={60}
        />
      </div>

      {context?.user ? (
        <div className="text-white font-bold text-xl flex gap-3">
          <LocationEdit />
          <Button className="rounded-full h-14 w-14 bg-[#F4F4F5] hover:bg-[#f4f4f55f] text-foreground cursor-pointer">
            <ShoppingCart color="black" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full h-14 w-14 bg-red-500 hover:bg-red-700 cursor-pointer">
                <User2 size={32} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-40">
              {context.user.email}
              <Button
                onClick={context.logout}
                className="w-fit text-black"
                variant="secondary"
              >
                Sign out
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/signup">
            <Button className="bg-[#F4F4F5] hover:bg-[#f4f4f55f] text-foreground cursor-pointer">
              Sign up
            </Button>
          </Link>
          <Link href="/signin">
            <Button className="bg-red-500 hover:bg-red-700 cursor-pointer">
              Sign in
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
