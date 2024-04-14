
import TodoDetails from "@/components/layout/TodoDetails";
import { getTodoById } from "@/db/todos";

export default async function Page({
    params: { id, },
}: {
    params: {
        id: string;
    };
}) {
    const todo = await getTodoById(id);
    if (!todo) {
        return "Todo not found";
    }
    return (
        <TodoDetails todo={todo} />)
}