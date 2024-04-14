import { Prisma } from "@prisma/client";
import db from "./prisma";
import { auth } from "../lib/auth";
import { updateFormSchema, createFormSchema } from "@/schemes/todo";
import { z } from "zod";
import { title } from "process";

function queryBuilder(query: string | undefined) {
    switch (query) {
        case "completed":
            return {
                completed: true
            };
        case "active":
            return {
                completed: false
            };
        default:
            return {
                title: {
                    contains: query
                }
            };

    }
}
export async function getAllTodos({ query }: { query?: string }) {
    try {
        const currentUser = await auth();
        const todos = await db.todo.findMany({
            where: {
                userId: currentUser?.user.id,
                AND: queryBuilder(query)
            },

            orderBy: {
                createdAt: "desc"
            }
        });
        return todos
    }
    catch (e) {
        console.log(e);
        return null;
    }

}

export async function createTodo({ data, userId }: { data: z.infer<typeof createFormSchema>, userId: string }) {
    try {
        const todo = await db.todo.create({
            data: {
                ...data,
                user: {
                    connect: {
                        id: userId
                    }
                },
            }
        });
        return todo;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteTodo(todoId: string) {
    try {
        const todo = await db.todo.delete({
            where: {
                id: todoId
            }
        });
        return todo;
    } catch (e) {
        console.log(e);
        return null
    }

}
export async function updateTodo(todoId: string, data: Prisma.TodoUpdateInput) {

    try {
        const todo = await db.todo.update({
            where: {
                id: todoId
            },
            data: {
                ...data
            }
        });

        return todo;
    } catch (e) {
        console.log(e);
        return null
    }
}
export async function getTodoById(todoId: string) {
    try {
        const todo = await db.todo.findUnique({
            where: {
                id: todoId
            }
        });
        return todo;
    } catch (e) {
        console.log(e);
        return null
    }
}