"use client"
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { signUp } from "@/actions/user";
import { RegisterSchema } from "@/schemes/user";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";


export default function RegisterForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            signUp(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                });
        });
    };
    return (
        <Card className="p-20">
            <CardHeader className="text-2xl uppercase">
                Create an account</CardHeader>
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

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Create an account
                    </Button>





                </form>
                {error && <p className="text-red-500"> {error} </p>}
                {success && <p className="text-green-500"> {success} </p>}
            </Form>
            <div className="flex items-center justify-center space-x-4 my-2">
                <div className="w-1/4 h-0.5 bg-gray-300"></div>
                <span className="text-gray-500">or</span>
                <div className="w-1/4 h-0.5 bg-gray-300"></div>
            </div>
            <Button
                disabled={isPending}
                className="w-full">
                <Link href="/">Login</Link>
            </Button>

        </Card >
    );
}