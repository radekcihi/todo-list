import { z } from "zod"

export const updateFormSchema = z.object({
    title: z.string({
        required_error: "A title is required.",
    }).optional(),
    dueDate: z.date({
        required_error: "A due date is required.",
    }).optional(),
    completed: z.boolean().optional(),
})
export const createFormSchema = z.object({
    title: z.string({
        required_error: "A title is required.",
    }),
    dueDate: z.date({
        required_error: "A due date is required.",
    }).optional(),
})