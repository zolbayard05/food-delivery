"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("zuv email ee oruulna uu"),
});

const Page = () => {
  const context = useContext(UserContext);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!context) return;
    setLoading(true);
    const message = await context.forgotPassword(data.email);
    setLoading(false);
    toast.success(message);
    setSent(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tight">Нууц үг сэргээх</h2>
      <p className="text-muted-foreground mb-6">
        Бүртгэлтэй имэйлээ оруулна уу, бид сэргээх холбоос илгээнэ.
      </p>

      {sent ? (
        <div className="flex items-start gap-3 rounded-lg border bg-secondary/50 p-4 text-sm">
          <CircleCheck className="mt-0.5 shrink-0 text-red-500" size={18} />
          <p>Имэйлээ шалгаад холбоос дээр дарж нууц үгээ сэргээнэ үү.</p>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="forgot-email">Имэйл</FieldLabel>
                  <Input
                    {...field}
                    id="forgot-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-red-500 hover:bg-red-600"
          >
            {loading ? "Илгээж байна..." : "Холбоос илгээх"}
          </Button>
        </form>
      )}

      <Link
        href="/signin"
        className="mt-6 text-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
        Нэвтрэх хуудас руу буцах
      </Link>
    </div>
  );
};

export default Page;
