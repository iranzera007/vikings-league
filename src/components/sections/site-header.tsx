import Image from "next/image";
import { ClipboardPenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscordIcon, WhatsAppIcon } from "@/components/ui/social-icons";
import { discord, registration, whatsapp } from "@/lib/links";
import { header, site } from "@/content/content";

export function SiteHeader() {
  const discordProps = discord();
  const whatsappProps = whatsapp();

  return (
    <header className="sticky top-0 z-70 flex items-center justify-between gap-3 border-b border-line bg-[rgba(11,14,19,0.92)] px-[clamp(14px,3vw,34px)] py-2.5 backdrop-blur-[16px]">
      <div className="flex min-w-0 items-center gap-2.5">
        <Image
          src={site.logo.src}
          alt={site.logo.alt}
          width={32}
          height={32}
          priority
          className="h-8 w-8 flex-none object-contain"
        />
        <span className="hidden font-display text-lg font-extrabold tracking-[0.03em] uppercase min-[400px]:inline">
          {site.name}
        </span>
      </div>

      <nav className="hidden items-center gap-[clamp(14px,2vw,28px)] lg:flex">
        {header.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-sans text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap text-text-dim uppercase transition-colors hover:text-text"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Discord Header Link */}
        <a
          {...discordProps}
          title="Discord Oficial"
          className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-[#5865F2]/40 bg-[#5865F2]/10 px-2.5 font-sans text-[11px] font-semibold tracking-wider text-[#7289DA] uppercase transition-all duration-200 hover:border-[#5865F2] hover:bg-[#5865F2] hover:text-white"
        >
          <DiscordIcon className="h-4 w-4 flex-none" />
          <span className="hidden sm:inline">Discord</span>
        </a>

        {/* WhatsApp Header Link */}
        <a
          {...whatsappProps}
          title="Grupo WhatsApp"
          className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-[#25D366]/40 bg-[#25D366]/10 px-2.5 font-sans text-[11px] font-semibold tracking-wider text-[#25D366] uppercase transition-all duration-200 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
        >
          <WhatsAppIcon className="h-4 w-4 flex-none" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        <Button {...registration()} size="sm" className="whitespace-nowrap max-[399px]:px-3">
          <ClipboardPenLine width={18} height={18} strokeWidth={1.6} aria-hidden />
          {header.cta}
        </Button>
      </div>
    </header>
  );
}

