"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("zuv email ee oruulna uu"),
  password: z
    .string()
    .min(8, "bagadaa 8 orontoi baina.")
    .max(12, "ihdee 12 orontoi baina."),
});

const Page = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const context = useContext(UserContext);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const error = await context?.signIn(data.email, data.password);
    setLoading(false);
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tight">Тавтай морил</h2>
      <p className="text-muted-foreground mb-6">
        Дуртай хоолондоо нэвтрэн орж захиалаарай.
      </p>

      <form
        id="signin-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-1"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-email">Имэйл</FieldLabel>
                <Input
                  {...field}
                  id="signin-email"
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signin-password">Нууц үг</FieldLabel>
                <Input
                  {...field}
                  id="signin-password"
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  autoComplete="current-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Нууц үгээ мартсан уу?
          </Link>
        </div>

        <Button
          type="submit"
          form="signin-form"
          disabled={loading}
          className="mt-4 w-full bg-red-500 hover:bg-red-600"
        >
          {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Бүртгэлгүй юу?{" "}
        <Link
          href="/signup"
          className="font-medium text-red-500 hover:text-red-600 underline underline-offset-4"
        >
          Бүртгүүлэх
        </Link>
      </p>
    </div>
  );
};
export default Page;
