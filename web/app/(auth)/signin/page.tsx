"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("zun email ee oruulna uu"),
  password: z
    .string()
    .min(8, "bagadaa 8 orontoi baina.")
    .max(12, "ihdee 12 orontoi baina."),
});

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <div className="flex items-center ">
      <div className="flex flex-col justify-center items-center h-screen w-2/5">
        <div className="w-105 h- flex flex-col ">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* ... */}
            {/* Build the form here */}
            {/* ... */}
          </form>

          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-muted-foreground">
            Log in ti enjoy your favorite dishes.
          </p>

          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="email ee oruul"
                      autoComplete="off"
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
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-description"
                        placeholder="password oo oruul"
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </div>
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
