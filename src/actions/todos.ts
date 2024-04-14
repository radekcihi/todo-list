"use server";

import { createFormSchema } from "@/components/todo/CreateForm";
import { updateFormSchema } from "@/components/todo/EditForm";
import { auth } from "@/lib/auth";
import { createTodo, deleteTodo, updateTodo } from "@/db/todos";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export async function createTodoAction(data: z.infer<typeof createFormSchema>) {
    const currentUser = await auth();
    if (!currentUser) return null

    try {
        const response = await createTodo({ data: data, userId: currentUser.user.id });
        if (!response) {
            return null
        }
        revalidatePath("/");
        return response
    } catch (e) {
        return null
    }
}

export async function deleteTodoAction(
    id: string
) {
    const currentUser = await auth();
    if (!currentUser) return null

    try {
        const response = await deleteTodo(id)
        if (!response) {
            return null
        }
        revalidatePath("/");
        return response;
    } catch (e) {

        return null
    }
}

export async function updateTodoAction({ id, data }: {
    id: string;
    data: z.infer<typeof updateFormSchema>
}) {
    const currentUser = await auth();
    if (!currentUser) return null

    try {

        const response = await updateTodo(id, data);
        if (!response) {
            return null
        }
        revalidatePath("/");
        return response
    } catch (e) {
        console.log(e);
        return null
    }
}

