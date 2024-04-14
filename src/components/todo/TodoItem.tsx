import { Todo } from "@prisma/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { useTransition } from "react";
import { updateTodoAction } from "@/actions/todos";

import DeleteTodo from "./DeleteTodo";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { toast } from "../ui/use-toast";
export default function TodoItem({
    todo,
    handleDelete,
    handleComplete
}: {
    todo: Todo,
    handleDelete: () => void
    handleComplete: () => void
}) {

    const timeString = todo.dueDate ? new Date(todo.dueDate).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }) : null


    const isWarning = todo.dueDate ? new Date(todo.dueDate) < new Date() : false
    const [isPending, startTransition] = useTransition()

    async function completeAction() {
        startTransition(async () => {
            handleComplete()
            const response = await updateTodoAction({ id: todo.id, data: { completed: !todo.completed } })
            if (!response) {
                toast({
                    description: "There is some problem with updating a todo",
                    duration: 1000,
                    variant: "destructive",
                });
            }
            toast({
                description: "Todo updated successfully",
                duration: 1000,
            });
        })
    }
    return (
        <div className="flex flex-row justify-between items-center gap-2">

            <div className="flex flex-row  items-center gap-2">
                <Checkbox checked={todo.completed} onClick={completeAction} />
                <label className={clsx({ "line-through": todo.completed })} htmlFor="task1">
                    {todo.title}
                </label>
            </div>

            <div className="flex flex-row items-center gap-1">
                <span className="text-xs text-gray-500 flex gap-1">{isWarning ? <ExclamationTriangleIcon className="text-red-500" /> : null} {timeString}</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            aria-haspopup="true"
                            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                            id="task1"
                            size="icon"
                            variant="ghost"
                        >
                            <MoreHorizontalIcon className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link className="cursor-pointer w-full " href={`/dashboard/todo/${todo.id}`}>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem >
                            <DeleteTodo id={todo.id} handleDelete={handleDelete} />
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div >

    )
}