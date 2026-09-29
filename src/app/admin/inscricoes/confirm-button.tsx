"use client";

import { useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { confirmRegistrationAction } from "./actions";
import { cn } from "@/lib/utils";

export function ConfirmButton({ id, name, isConfirmed }: { id: string; name: string; isConfirmed: boolean }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirmed) return null; // Não mostra o botão se já estiver confirmado

  async function handleConfirm() {
    if (window.confirm(`Tem certeza que deseja CONFIRMAR o pagamento/inscrição de ${name}?`)) {
      setIsConfirming(true);
      try {
        await confirmRegistrationAction(id);
      } catch (error) {
        alert("Erro ao confirmar inscrição. Tente novamente.");
        setIsConfirming(false);
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleConfirm}
      disabled={isConfirming}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "text-green-400 hover:bg-green-400/20 hover:text-green-300 border-green-400/30 disabled:opacity-50 mr-2"
      )}
      title="Confirmar Inscrição"
    >
      {isConfirming ? (
        <LoaderCircle width={16} height={16} className="animate-spin" aria-hidden />
      ) : (
        <Check width={16} height={16} aria-hidden />
      )}
      <span className="sr-only">Confirmar {name}</span>
    </button>
  );
}
