"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z
  .object({
    password: z.string().min(8, "bagadaa 8 orontoi baina.").max(12, "ihdee 12 orontoi baina."),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const ResetPasswordContent = () => {
  const context = useContext(UserContext);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!context || !token) return;
    setLoading(true);
    const error = await context.resetPassword(token, data.password);
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Нууц үг амжилттай сэргээгдлээ");
    router.push("/signin");
  };

  if (!token) {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Холбоос буруу байна</h2>
        <p className="text-muted-foreground">
          Сэргээх холбоос дутуу эсвэл хугацаа дууссан байна.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tight">Шинэ нууц үг</h2>
      <p className="text-muted-foreground mb-6">
        Дараах хэсэгт шинэ нууц үгээ оруулна уу.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-password">Шинэ нууц үг</FieldLabel>
                <Input
                  {...field}
                  id="reset-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-confirm-password">
                  Нууц үг давтах
                </FieldLabel>
                <Input
                  {...field}
                  id="reset-confirm-password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  autoComplete="new-password"
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
          {loading ? "Хадгалж байна..." : "Хадгалах"}
        </Button>
      </form>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Ачааллаж байна...</p>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default Page;
