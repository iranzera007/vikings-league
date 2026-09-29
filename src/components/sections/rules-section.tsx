"use client";

import { useState } from "react";
import {
  UserCheck,
  Dices,
  Swords,
  BarChart3,
  Award,
  CheckCircle2,
  ChevronRight,
  Shield,
} from "lucide-react";
import { RevealWords } from "@/components/ui/reveal-words";
import { rules } from "@/content/content";

const categoryIcons = {
  requirements: UserCheck,
  draft: Dices,
  format: Swords,
  scout: BarChart3,
  awards: Award,
};

export function RulesSection() {
  const [activeId, setActiveId] = useState<string>(rules.categories[0].id);

  const activeCategory =
    rules.categories.find((cat) => cat.id === activeId) || rules.categories[0];

  return (
    <section id="sr" className="relative border-b border-line bg-bg py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-[1240px] px-[clamp(18px,3vw,44px)]">
        {/* Cabeçalho da Seção */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/24 bg-accent/8 px-3.5 py-1 font-sans text-[10px] font-semibold tracking-[0.2em] text-accent-soft uppercase">
            <Shield className="h-3.5 w-3.5 text-accent" />
            {rules.eyebrow}
          </div>

          <h2 className="mt-4 font-display text-[clamp(32px,5vw,64px)] leading-[0.92] font-extrabold text-balance uppercase">
            <RevealWords
              delay={0.1}
              segments={[{ text: rules.titleLead }, { text: rules.titleAccent, accent: true }]}
            />
          </h2>

          <div className="mt-2 inline-block font-sans text-xs font-bold tracking-[0.16em] text-accent-bright uppercase">
            {rules.edition}
          </div>

          <p className="mx-auto mt-3 max-w-[62ch] font-sans text-sm text-text-muted leading-relaxed">
            {rules.subtitle}
          </p>
        </div>

        {/* Navegação por Categorias do Regulamento */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4">
          {rules.categories.map((category) => {
            const IconComponent =
              categoryIcons[category.id as keyof typeof categoryIcons] || Shield;
            const isActive = category.id === activeId;

            return (
              <button
                key={category.id}
                onClick={() => setActiveId(category.id)}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-2.5 font-sans text-xs font-semibold uppercase transition-all duration-300 ${
                  isActive
                    ? "border-accent-bright bg-accent/16 text-white shadow-[0_0_20px_rgba(46,123,255,0.3)]"
                    : "border-white/10 bg-surface/50 text-text-muted hover:border-white/20 hover:bg-surface hover:text-white"
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 ${isActive ? "text-accent-bright" : "text-text-dim"}`}
                />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo da Categoria Selecionada + Visão Geral em Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Card Principal de Regras */}
          <div className="rounded-2xl border border-white/12 bg-surface/80 p-[clamp(20px,3.5vw,36px)] backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              {(() => {
                const ActiveIcon =
                  categoryIcons[activeCategory.id as keyof typeof categoryIcons] || Shield;
                return (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/12 text-accent-bright shadow-[0_0_15px_rgba(46,123,255,0.25)]">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                );
              })()}
              <div>
                <span className="font-sans text-[10px] font-bold tracking-[0.18em] text-accent-soft uppercase">
                  {activeCategory.tag}
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                  {activeCategory.title}
                </h3>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6">
              {activeCategory.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/6 bg-black/40 p-5 transition-all duration-200 hover:border-accent/30"
                >
                  <h4 className="flex items-center gap-2 font-sans text-sm font-bold text-accent-soft uppercase">
                    <ChevronRight className="h-4 w-4 text-accent-bright flex-none" />
                    {item.label}
                  </h4>

                  {"text" in item && item.text ? (
                    <p className="mt-2 pl-6 font-sans text-sm text-text-body leading-relaxed">
                      {item.text}
                    </p>
                  ) : null}

                  {"bullets" in item && item.bullets && item.bullets.length > 0 ? (
                    <ul className="mt-3 flex flex-col gap-2.5 pl-6">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm text-text-body">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent flex-none" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Painel Lateral de Resumo das Regras */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/10 to-transparent p-6">
              <h4 className="font-display text-lg font-extrabold text-white uppercase">
                RESUMO RÁPIDO DO REGULAMENTO
              </h4>

              <div className="mt-4 flex flex-col gap-3.5 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <span className="text-text-muted">Idade Mínima</span>
                  <span className="font-bold text-white">14 anos</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <span className="text-text-muted">Formato do Draft</span>
                  <span className="font-bold text-white">Sorteio ao Vivo</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <span className="text-text-muted">Capitães Fixos</span>
                  <span className="font-bold text-white">12 Capitães</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <span className="text-text-muted">Divisão de Grupos</span>
                  <span className="font-bold text-white">2 Grupos de 6 Equipes</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <span className="text-text-muted">Vagas Mata-Mata</span>
                  <span className="font-bold text-white">8 Melhores Gerais</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
                  <span className="text-text-muted">Grande Final</span>
                  <span className="font-bold text-white">Melhor de 3 (MD3)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Scout Clubs</span>
                  <span className="font-bold text-accent-bright">Monitoramento Geral</span>
                </div>
              </div>
            </div>

            {/* Chamada para Inscrição no Regulamento */}
            <div className="rounded-2xl border border-white/10 bg-surface p-6 text-center">
              <h5 className="font-display text-base font-extrabold uppercase text-white">
                Pronto para competir?
              </h5>
              <p className="mt-2 font-sans text-xs text-text-muted">
                Garanta sua vaga na 2ª Edição e receba seu banner exclusivo de apresentação.
              </p>
              <a
                href="#inscricao"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 font-sans text-xs font-extrabold tracking-wider text-white uppercase shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-accent-bright"
              >
                GARANTIR MINHA VAGA
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
