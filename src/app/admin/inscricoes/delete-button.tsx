"use client";

import { useState } from "react";
import { Trash2, LoaderCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { deleteRegistrationAction } from "./actions";
import { cn } from "@/lib/utils";

export function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (window.confirm(`Tem certeza que deseja EXCLUIR a inscrição de ${name}? Esta ação não pode ser desfeita e a foto também será removida.`)) {
      setIsDeleting(true);
      try {
        await deleteRegistrationAction(id);
      } catch (error) {
        alert("Erro ao excluir inscrição. Tente novamente.");
        setIsDeleting(false);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-red-400 hover:bg-red-400/20 hover:text-red-300 border-red-400/30 disabled:opacity-50")}
    >
      {isDeleting ? (
        <LoaderCircle width={16} height={16} className="animate-spin" aria-hidden />
      ) : (
        <Trash2 width={16} height={16} aria-hidden />
      )}
      <span className="sr-only">Excluir {name}</span>
    </button>
  );
}
