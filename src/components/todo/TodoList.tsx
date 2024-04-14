"use client"
import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";
import { useOptimisticTodo } from "@/hooks/useOptimisticTodo";



export default function TodoList({
    todos
}: {
    todos: Todo[]
}) {

    const { optimisticUpdate, todo } = useOptimisticTodo(todos);
    return (
        <div className="flex flex-col gap-1">
            {todo.map(todo => (
                <TodoItem key={todo.id} todo={todo} handleDelete={() => optimisticUpdate({ action: "delete", todo })} handleComplete={() => optimisticUpdate({
                    action: "update",
                    todo: {
                        ...todo,
                        completed: !todo.completed
                    }
                })} />
            ))}
        </div>
    );
}