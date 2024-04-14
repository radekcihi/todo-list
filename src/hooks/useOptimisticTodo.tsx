import { Todo } from '@prisma/client'
import { useOptimistic } from 'react'



export const useOptimisticTodo = (todos: Todo[]) => {
    const [optimisticTodos, optimisticUpdate] = useOptimistic(
        todos,
        (state, { action, todo }: { action: string; todo: Todo }) => {
            switch (action) {
                case "delete":
                    return state.filter(({ id }) => id !== todo.id);
                 case "update":
                    return state.map((t) => (t.id === todo.id ? todo : t)); 
                default:
                    return [...state, todo];
            }
        },
    );

    return { optimisticUpdate, todo: optimisticTodos }
}