import { getAllTodos } from "@/db/todos";
import TodoList from "./TodoList";
import AnimationDiv from "../layout/AnimationDiv";

export default async function TodoListWithQuery({
    query
}: {
    query: string
}) {
    const todos = await getAllTodos({ query }); // Add default value of an empty array
    if (!todos) return null;
    return (
        <AnimationDiv>
            <TodoList todos={todos} />
        </AnimationDiv>
    );
}