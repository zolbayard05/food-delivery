"use client";

import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

const VerifyContent = () => {
  const context = useContext(UserContext);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!token || !context) {
        setStatus("error");
        setMessage("Token oldsongui");
        return;
      }

      const result = await context.verifyEmail(token);
      setMessage(result);
      setStatus(result.includes("amjilttai") ? "success" : "error");
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {status === "loading" && (
        <Loader2 className="animate-spin text-muted-foreground" size={40} />
      )}
      {status === "success" && <CircleCheck className="text-red-500" size={40} />}
      {status === "error" && <CircleX className="text-destructive" size={40} />}

      <h2 className="text-2xl font-bold tracking-tight">
        {status === "loading" && "Баталгаажуулж байна..."}
        {status === "success" && "Амжилттай баталгаажлаа"}
        {status === "error" && "Алдаа гарлаа"}
      </h2>
      <p className="text-muted-foreground">{message}</p>
      <Link href="/signin" className="mt-2 w-full">
        <Button className="w-full bg-red-500 hover:bg-red-600">
          Нэвтрэх хуудас руу очих
        </Button>
      </Link>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Ачааллаж байна...</p>}>
      <VerifyContent />
    </Suspense>
  );
};

export default Page;
