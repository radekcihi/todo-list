import SearchBar from "@/components/todo/SearchBar";
import TodoList from "@/components/todo/TodoList";
import TodoListWithQuery from "@/components/todo/TodoListWithQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTodos } from "@/db/todos";
import { Suspense } from "react";


export default async function Page({
    searchParams
}: {
    searchParams: { query: string }
}) {

    return (
        <div className="my-2">
            <SearchBar placeholder={'Search for Todos("active", "completed" or title)'} />
            <div className="w-full p-2 h-[calc(100vh-170px)] no-scrollbar overflow-y-auto">
                <Suspense key={searchParams.query} fallback={<Skeleton />}>
                    <TodoListWithQuery query={searchParams.query} />
                </Suspense>
            </div>
        </div>
    );
}
