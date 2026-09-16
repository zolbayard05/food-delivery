"use client";
import { SignUpEmail } from "@/components/main/SignUpEmail";
import { SignUpPassword } from "@/components/main/SignUpPassword";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [step, setStep] = useState(0);

  const handleStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tight">Бүртгэл үүсгэх</h2>
      <p className="text-muted-foreground mb-6">
        Дуртай хоолоо олж, амархан захиалаарай.
      </p>

      {step === 1 ? (
        <SignUpPassword onBack={() => setStep(0)} />
      ) : (
        <SignUpEmail handleStep={handleStep} />
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Бүртгэлтэй юу?{" "}
        <Link
          href="/signin"
          className="font-medium text-red-500 hover:text-red-600 underline underline-offset-4"
        >
          Нэвтрэх
        </Link>
      </p>
    </div>
  );
};
export default Page;
