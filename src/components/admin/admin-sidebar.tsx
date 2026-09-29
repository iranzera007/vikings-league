"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Shirt, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/admin/inscricoes", label: "Inscrições", icon: Users },
  { href: "/admin/uniformes", label: "Uniformes", icon: Shirt },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-line-strong bg-black/40 flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-line-strong">
        <span className="font-display font-extrabold text-xl uppercase tracking-wider text-accent-soft">
          Vikings Admin
        </span>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-accent/20 text-white border border-accent/30" 
                  : "text-text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-accent-bright" : "text-text-faint")} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-line-strong">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium text-text-muted hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="w-4 h-4" />
            Sair do Painel
          </button>
        </form>
      </div>
    </aside>
  );
}
