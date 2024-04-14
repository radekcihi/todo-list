"use client"
import type { Todo } from "@prisma/client"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateTodoAction } from "@/actions/todos";
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Switch } from "../ui/switch";
import { useTransition } from "react";
import { useRouter } from "next/navigation";


export const updateFormSchema = z.object({
    title: z.string({
        required_error: "A title is required.",
    }).optional(),
    dueDate: z.date({
        required_error: "A due date is required.",
    }).optional(),
    completed: z.boolean().optional(),
})

export default function EditForm({ todo }: { todo: Todo }) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof updateFormSchema>>({
        resolver: zodResolver(updateFormSchema),
    })
    const router = useRouter()
    function onSubmit(data: z.infer<typeof updateFormSchema>) {
        startTransition(async () => {
            const result = await updateTodoAction({ id: todo.id, data })
            if (!result) {
                toast({
                    description: "There is some problem with updating a todo",
                    duration: 1000,
                })
            }
            toast({
                description: "Todo updated successfully",
                duration: 1000,
            })
        })
        router.back()

    }
    return (
        <> <p className="text-2xl font-semibold leading-none tracking-tight uppercase py-2"> edit a  task</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Title</FormLabel>
                                <Input
                                    {...field}
                                    placeholder="Enter a title"
                                    className="w-[240px]"
                                    value={field.value ? field.value : todo.title}
                                    onChange={field.onChange}
                                />
                                <FormDescription>
                                    A title helps you identify the task.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className="w-[240px] pl-3 text-left font-normal"
                                            >
                                                {todo.dueDate && !field.value ? (
                                                    format(todo.dueDate, "PPP")
                                                ) : !todo.dueDate && field.value ? (
                                                    format(field.value, "PPP")
                                                ) : todo.dueDate && field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    "Select a date"
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={todo.dueDate ? new Date(todo.dueDate) : field.value ? new Date(field.value) : undefined}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                /* disabled older than today */
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Due Date is the date when the task should be completed.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="completed"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Completed</FormLabel>
                                <Switch
                                    defaultChecked={todo.completed}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                <FormDescription>
                                    Mark the task as completed.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" aria-disabled={isPending} className="w-1/3">Submit</Button>
                </form>
            </Form>
        </>);
}

