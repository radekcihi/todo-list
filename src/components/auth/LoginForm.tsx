"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";


import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemes/user";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      signIn("credentials", { ...values, redirect: false })
        .then((response) => {
          if (response?.error) {
            switch (response.error) {
              case "CredentialsSignin":
                return setError("Invalid email or password. Please try again.");
              default:
                return setError("Something went wrong")
            }
          }
          router.push("/dashboard")
        })
    });

  };

  return (
    <Card className="p-20">
      <CardHeader className="text-2xl uppercase">
        Login into an account</CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          {error && <p className="text-red-500"> {error} </p>}
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
      </Form>
      {/* divider  */}
      <div className="flex items-center justify-center space-x-4 my-2">
        <div className="w-1/4 h-0.5 bg-gray-300"></div>
        <span className="text-gray-500">or</span>
        <div className="w-1/4 h-0.5 bg-gray-300"></div>
      </div>
      <Button
        disabled={isPending}
        type="button"
        className="w-full"
        onClick={() => router.push("/register")}
      >
        Register
      </Button>

    </Card>
  );
};
