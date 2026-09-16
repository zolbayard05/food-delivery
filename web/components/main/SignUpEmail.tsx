import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const formSchema = z.object({
  email: z.string().email("zuv email ee oruulna uu"),
});

export const SignUpEmail = ({ handleStep }: { handleStep: () => void }) => {
  const context = useContext(UserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleStep();
    context?.handleEmail(data.email);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-email">Имэйл</FieldLabel>
              <Input
                {...field}
                id="signup-email"
                aria-invalid={fieldState.invalid}
                placeholder="name@example.com"
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="mt-4 w-full bg-red-500 hover:bg-red-600">
        Үргэлжлүүлэх
      </Button>
    </form>
  );
};
