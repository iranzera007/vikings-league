"use client";

import { DiscordIcon, WhatsAppIcon } from "@/components/ui/social-icons";
import { discord, whatsapp } from "@/lib/links";

export function FloatingSocials() {
  const discordLink = discord();
  const whatsappLink = whatsapp();

  return (
    <aside
      aria-label="Canais oficiais de comunidade"
      className="fixed bottom-6 right-5 z-80 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* Botão Flutuante Discord */}
      <a
        {...discordLink}
        title="Entrar no servidor do Discord"
        className="group relative flex items-center justify-center gap-2.5 rounded-full border border-[#5865F2]/40 bg-[#0F131D]/90 p-3 text-white shadow-[0_8px_24px_rgba(88,101,242,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#5865F2] hover:bg-[#5865F2] hover:shadow-[0_10px_30px_rgba(88,101,242,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2]"
      >
        <span className="max-w-0 overflow-hidden font-sans text-xs font-bold tracking-wider uppercase opacity-0 transition-all duration-300 ease-out group-hover:max-w-[140px] group-hover:pl-2 group-hover:opacity-100 whitespace-nowrap">
          Discord
        </span>
        <div className="relative flex items-center justify-center">
          <DiscordIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5865F2] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7289DA]" />
          </span>
        </div>
      </a>

      {/* Botão Flutuante WhatsApp */}
      <a
        {...whatsappLink}
        title="Entrar no grupo oficial do WhatsApp"
        className="group relative flex items-center justify-center gap-2.5 rounded-full border border-[#25D366]/40 bg-[#0F131D]/90 p-3 text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#25D366] hover:bg-[#25D366] hover:shadow-[0_10px_30px_rgba(37,211,102,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <span className="max-w-0 overflow-hidden font-sans text-xs font-bold tracking-wider uppercase opacity-0 transition-all duration-300 ease-out group-hover:max-w-[140px] group-hover:pl-2 group-hover:opacity-100 whitespace-nowrap">
          WhatsApp
        </span>
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
          </span>
        </div>
      </a>
    </aside>
  );
}
