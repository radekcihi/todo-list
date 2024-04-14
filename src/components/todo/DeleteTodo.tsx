"use client";

import { deleteTodoAction } from "@/actions/todos";
import { useTransition } from "react";
import { toast } from "../ui/use-toast";


export default function DeleteTodo({ id, handleDelete }: { id: string; handleDelete: () => void }) {
  const [isPending, startTransition] = useTransition();
  async function handleClick() {
    startTransition(async () => {
      handleDelete();
      const response = await deleteTodoAction(id);

      if (!response) {
        toast({
          description: "There is some problem with deleting a todo",
          duration: 1000,
          variant: "destructive",
        });
      }
      toast({
        description: "Todo deleted successfully",
        duration: 1000,
      });
    })
  }
  return (

    <button onClick={handleClick} className="w-full text-left" aria-disabled={isPending} >
      Delete
    </button>


  );
}
