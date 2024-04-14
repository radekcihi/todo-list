"use client"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createTodoAction } from "@/actions/todos";
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
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
import { toast } from "../ui/use-toast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";


export const createFormSchema = z.object({
    title: z.string({
        required_error: "A title is required.",
    }),
    dueDate: z.date({
        required_error: "A due date is required.",
    }).optional(),
})

export default function CreateForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof createFormSchema>>({
        resolver: zodResolver(createFormSchema),
    })
    async function onSubmit(data: z.infer<typeof createFormSchema>) {
        startTransition(async () => {
            const result = await createTodoAction(data)
            if (!result) {
                toast({
                    description: "There is some problem with creating a todo",
                    duration: 1000,
                })
            }
            toast({
                description: "Todo created successfully",
                duration: 1000,
            })
        })
        //router.back()
    }
    return (
        <>
            <p className="text-2xl font-semibold leading-none tracking-tight uppercase py-2"> Create a new task</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2" >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Title</FormLabel>
                                <Input
                                    placeholder="Enter a title"
                                    value={field.value || ""}
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
                            <FormItem className="flex flex-col ">
                                <FormLabel>Due Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    " pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
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

                    <Button type="submit" className="w-1/3" aria-disabled={isPending}>Submit</Button>
                </form>
            </Form>
        </>
    );

}

