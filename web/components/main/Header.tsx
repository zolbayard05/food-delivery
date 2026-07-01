"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

export const Header = () => {
  const context = useContext(UserContext);

  return (
    <div className="w-full bg-[#18181B] flex justify-between items-center py-3 px-28">
      <div>
        <Image
          src="/Logo=Horizon.png"
          alt="Main-logo"
          width={146}
          height={44}
        />
      </div>

      {context?.user ? (
        <div className="text-white">
          user nevtersen baina <p>{context.user.email}</p>
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
