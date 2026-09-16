import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "bagadaa 8 orontoi baina.")
      .max(12, "ihdee 12 orontoi baina."),

    confirmPassword: z.string(),
  })

  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not  match",
        path: ["confirmPassword"],
      });
    }
  });

export const SignUpPassword = ({ onBack }: { onBack: () => void }) => {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const error = await context?.signUp(data.password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Имэйлээ шалгаад бүртгэлээ баталгаажуулна уу");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onBack}
        className="mb-1 flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft size={16} /> Буцах
      </button>

      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-password">Нууц үг</FieldLabel>
              <Input
                {...field}
                id="signup-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-confirm-password">
                Нууц үг давтах
              </FieldLabel>
              <Input
                {...field}
                id="signup-confirm-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={loading}
        className="mt-4 w-full bg-red-500 hover:bg-red-600"
      >
        {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
      </Button>
    </form>
  );
};
