import Modal from "@/components/layout/Modal";
import TodoDetails from "@/components/layout/TodoDetails";
import { getTodoById } from "@/db/todos";

export default async function Page({
    params: { id }
}: {
    params: {
        id: string;
    };
}) {
    const todo = await getTodoById(id);
    return (
        <Modal>
            {todo ? <TodoDetails todo={todo} /> : "Todo not found"}
        </Modal>
    );
}