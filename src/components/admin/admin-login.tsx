"use client";

import { useActionState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";
import { loginAction } from "@/app/admin/actions";
import { LoaderCircle } from "lucide-react";

export function AdminLogin() {
  const [error, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text vl-texture-page">
      <main className="mx-auto w-full max-w-[420px] px-[clamp(12px,3vw,24px)] py-[clamp(40px,8vw,96px)]">
        <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[0.9] font-extrabold uppercase">
          Acesso <span className="text-accent">restrito</span>
        </h1>
        <form action={formAction} className="mt-6 border border-line-strong bg-black/20 p-[clamp(12px,1.5vw,16px)]">
          <Field label="Senha Administrativa">
            <input className={inputClass} name="password" type="password" autoComplete="current-password" required />
          </Field>
          {error ? (
            <p className="mt-3 border-l-2 border-red-400 bg-red-400/8 px-4 py-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" disabled={isPending} className={cn(buttonVariants({ size: "sm" }), "mt-4 w-full py-3 disabled:opacity-50")}>
            {isPending ? <LoaderCircle className="w-5 h-5 animate-spin" /> : "ENTRAR NO PAINEL"}
          </button>
        </form>
      </main>
    </div>
  );
}
