"use client";
import { SignUpEmail } from "@/components/main/SignUpEmail";
import { SignUpPassword } from "@/components/main/SignUpPassword";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const page = () => {
  const [step, setStep] = useState(0);

  const handleStep = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <div className="flex items-center ">
      <div className="flex flex-col justify-center items-center h-screen w-2/5">
        <div className="w-105 h- flex flex-col gap-4">
          <Button className="w-10 bg">
            <ChevronLeft className="" />
          </Button>
          <h2 className="font-bold text-2xl">Create your account</h2>
          <p className="text-muted-foreground">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        {step === 1 ? (
          <SignUpPassword />
        ) : (
          <SignUpEmail handleStep={handleStep} />
        )}
      </div>
      <div className="flex h-screen max-w-3/5 p-5">
        <Image
          src="/food-delivery-hero.jpg"
          alt="heroImage"
          width={1200}
          height={1000}
          className="rounded-2xl object-cover"
        ></Image>
      </div>
    </div>
  );
};
export default page;
