"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Trash2 } from "lucide-react";
import { deleteTransaction } from "@/app/actions";

export function DeleteButton({ id, description }: { id: string; description: string }) {
  return (
    <form action={deleteTransaction.bind(null, id)}>
      <Button description={description} />
    </form>
  );
}

function Button({ description }: { description: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={`Excluir ${description}`}
      title="Excluir movimentação"
      className="flex size-8 items-center justify-center rounded-lg text-slate-400 opacity-60 transition-all duration-150 hover:bg-rose-50 hover:text-rose-600 hover:opacity-100 disabled:cursor-not-allowed dark:text-slate-500 dark:hover:bg-rose-500/15 dark:hover:text-rose-400 group-hover:opacity-100"
    >
      {pending ? (
        <Loader2 className="size-3.5 animate-spin text-rose-500" />
      ) : (
        <Trash2 className="size-3.5" />
      )}
    </button>
  );
}
