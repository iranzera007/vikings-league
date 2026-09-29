import Image from "next/image";
import { ArrowRight, ShieldCheck, Shirt, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealSection } from "@/components/ui/reveal-section";
import { RevealWords } from "@/components/ui/reveal-words";
import { finalCta, site } from "@/content/content";
import { registration } from "@/lib/links";

export function FinalCtaSection() {
  return (
    <RevealSection
      id="inscricao"
      className="scroll-mt-16 border-b border-line bg-bg px-[clamp(18px,3vw,44px)] py-[clamp(52px,8vw,130px)] vl-texture"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-start gap-[clamp(24px,4vw,64px)]">
          <div className="min-w-[min(100%,300px)] flex-[1_1_420px]">
            <Image
              data-stagger
              src={site.logo.src}
              alt={site.logo.alt}
              width={116}
              height={116}
              className="block h-auto w-[clamp(88px,12vw,116px)]"
            />
            <h2
              className="mt-[clamp(16px,2.4vw,26px)] max-w-[20ch] font-display text-[clamp(36px,7.4vw,104px)] leading-[0.95] font-extrabold text-balance uppercase"
            >
              <RevealWords
                segments={[
                  { text: finalCta.titleLead + " " },
                  { text: finalCta.titleAccent, accent: true },
                ]}
                tail={finalCta.titleTail}
              />
            </h2>
            <p
              data-stagger
              className="mt-6 text-[clamp(15px,2vw,18px)] leading-[1.6] text-pretty text-text-muted max-w-[50ch]"
            >
              {finalCta.paragraph}
            </p>
          </div>

          <div className="min-w-[min(100%,280px)] flex-[1_1_520px]">
            <div data-stagger className="mb-4">
              <span className="font-sans text-xs font-bold tracking-widest text-accent-soft uppercase">
                {finalCta.headline}
              </span>
            </div>

            {/* 2 Offer Cards in Final CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Plano Standard R$ 49,90 */}
              <div
                data-stagger
                className="flex flex-col justify-between rounded-xl border border-line-strong bg-black/40 p-5 transition-all hover:border-accent/40"
              >
                <div>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-sans text-[10px] font-extrabold text-text-dim uppercase">
                    EXPERIÊNCIA COMPLETA
                  </span>
                  <div className="mt-3 font-display text-4xl font-extrabold text-white">
                    {finalCta.standardOffer.price}
                  </div>
                  <div className="mt-1 font-sans text-sm font-bold text-accent-soft">
                    {finalCta.standardOffer.label}
                  </div>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">
                    {finalCta.standardOffer.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line-strong">
                  <Button {...registration()} variant="outline" size="block" className="py-3 text-xs">
                    GARANTIR R$ 49,90
                    <ArrowRight width={16} height={16} aria-hidden />
                  </Button>
                </div>
              </div>

              {/* Plano Premium R$ 89,90 */}
              <div
                data-stagger
                className="flex flex-col justify-between rounded-xl border border-accent bg-accent/10 p-5 shadow-[0_0_30px_rgba(46,123,255,0.25)] relative overflow-hidden"
              >
                <div>
                  <span className="rounded bg-accent px-2 py-0.5 font-sans text-[10px] font-extrabold text-white uppercase">
                    UNIFORME FC 27 INCLUSO
                  </span>
                  <div className="mt-3 font-display text-4xl font-extrabold text-white">
                    {finalCta.premiumOffer.price}
                  </div>
                  <div className="mt-1 font-sans text-sm font-bold text-accent-bright">
                    {finalCta.premiumOffer.label}
                  </div>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">
                    {finalCta.premiumOffer.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line-strong">
                  <Button {...registration()} variant="solid" size="block" className="py-3 text-xs">
                    GARANTIR R$ 89,90
                    <ArrowRight width={16} height={16} aria-hidden />
                  </Button>
                </div>
              </div>
            </div>

            <div data-stagger className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line-strong bg-black/20 px-4 py-3 text-xs text-text-dim">
              <div className="flex items-center gap-2">
                <ShieldCheck width={16} height={16} className="text-accent" aria-hidden />
                <span>{finalCta.note}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <span>{finalCta.vacancies}</span>
                <span className="text-accent">/</span>
                <span>{finalCta.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
