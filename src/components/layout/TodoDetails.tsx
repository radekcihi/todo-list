import EditForm from "../todo/EditForm";
import type { Todo } from "@prisma/client"
export default function TodoDetails({ todo }: { todo: Todo }) {

    return (
        <div className="m-2">
            <EditForm todo={todo} />
        </div>
    )
}