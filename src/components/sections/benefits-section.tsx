import { Check, ArrowRight, Shirt, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealSection } from "@/components/ui/reveal-section";
import { RevealWords } from "@/components/ui/reveal-words";
import { benefits } from "@/content/content";
import { registration } from "@/lib/links";
import { cn } from "@/lib/utils";

export function BenefitsSection() {
  return (
    <RevealSection
      id="s3"
      className="border-b border-line bg-bg-alt px-[clamp(18px,3vw,44px)] py-[clamp(52px,7vw,116px)] vl-texture"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div data-stagger className="text-center max-w-[780px] mx-auto">
          <div className="mb-[14px] font-sans text-[10px] font-semibold tracking-[0.2em] text-accent-soft uppercase">
            {benefits.eyebrow}
          </div>
          <h2 className="font-display text-[clamp(30px,5vw,60px)] leading-[0.92] font-extrabold uppercase">
            <RevealWords
              segments={[
                { text: benefits.titleLead + " " },
                { text: benefits.titleAccent, accent: true },
              ]}
            />
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            {benefits.subtitle}
          </p>
        </div>

        {/* 2 Plans Pricing Grid */}
        <div className="mt-[clamp(36px,5vw,64px)] grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {benefits.plans.map((plan) => (
            <div
              key={plan.id}
              data-stagger
              className={cn(
                "relative flex flex-col justify-between overflow-hidden rounded-2xl border p-[clamp(20px,3vw,36px)] transition-all duration-300",
                plan.highlight
                  ? "border-accent bg-accent/8 shadow-[0_0_40px_rgba(46,123,255,0.25)] ring-1 ring-accent/60"
                  : "border-line-strong bg-black/30 hover:border-white/20",
              )}
            >
              {/* Top Badge */}
              {plan.badge && (
                <div className="mb-4 inline-flex self-start items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-sans text-[11px] font-extrabold text-accent-soft uppercase">
                  {plan.highlight && <Flame size={14} className="text-accent fill-accent" />}
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Plan Header */}
                <h3 className="font-display text-3xl font-extrabold uppercase text-white sm:text-4xl">
                  {plan.title}
                </h3>
                <p className="mt-1 text-sm text-text-dim">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-2 border-b border-line-strong pb-6">
                  <span className="font-display text-[clamp(44px,6vw,68px)] font-extrabold leading-none text-white">
                    {plan.price}
                  </span>
                  <span className="font-sans text-xs text-text-dim uppercase">
                    / taxa de inscrição
                  </span>
                </div>

                {/* Uniform Highlight Banner for Premium */}
                {plan.id === "premium" && (
                  <div className="mt-6 rounded-xl border border-accent/50 bg-accent/15 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-accent text-white">
                        <Shirt size={22} />
                      </div>
                      <div>
                        <span className="font-sans text-[10px] font-extrabold tracking-wider text-accent-bright uppercase">
                          BÔNUS EXCLUSIVO PREMIUM
                        </span>
                        <h4 className="font-display text-lg font-bold text-white uppercase">
                          UNIFORME OFICIAL — EDIÇÃO FC 27
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="mt-6 space-y-3.5">
                  <span className="block font-sans text-[11px] font-bold tracking-widest text-text-faint uppercase">
                    {plan.id === "premium" ? "TUDO DO PLANO R$ 49,90 +" : "O QUE ESTÁ INCLUSO:"}
                  </span>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={cn(
                        "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs font-bold",
                        feature.highlight
                          ? "bg-accent text-white shadow-[0_0_10px_rgba(46,123,255,0.6)]"
                          : "bg-accent/20 text-accent-soft",
                      )}>
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span className={cn(
                        "text-sm leading-snug",
                        feature.highlight ? "font-bold text-white" : "text-text-muted"
                      )}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-8 pt-4 border-t border-line">
                <Button
                  {...registration()}
                  size="block"
                  variant={plan.highlight ? "solid" : "outline"}
                  className="py-4 text-sm font-extrabold"
                >
                  {plan.cta}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
