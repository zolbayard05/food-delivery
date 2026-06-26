"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    await axios.post("http://localhost:3000/user/signin", {
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex items-center ">
      <div className="flex flex-col justify-center items-center h-screen w-2/5">
        <div className="w-105 h- flex flex-col gap-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* ... */}
            {/* Build the form here */}
            {/* ... */}
          </form>

          <Button className="w-10 bg">
            <ChevronLeft className="" />
          </Button>
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
                      placeholder="Enter your email"
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
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      placeholder="Password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />

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
              Let's go
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
