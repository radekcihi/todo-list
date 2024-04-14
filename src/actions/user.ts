"use server"
import db from "@/db/prisma";
import { getUserByEmail } from "@/db/user";
import { LoginSchema, RegisterSchema } from "@/schemes/user";
import { Prisma } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { z } from "zod";


export async function signUp(values: z.infer<typeof RegisterSchema>) {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password } = validatedFields.data;
    const hashedPassword = await hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
        },
    });

    return { success: "Registered sucessfully!" };
};
