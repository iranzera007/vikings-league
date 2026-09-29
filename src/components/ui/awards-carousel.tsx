"useClient";
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X, RotateCw, Trophy } from "lucide-react";
import type { Award } from "@/content/content";
import { cn } from "@/lib/utils";

interface AwardsCarouselProps {
  items: readonly Award[];
}

export function AwardsCarousel({ items }: AwardsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<Award | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const total = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play when not hovered or open in lightbox
  useEffect(() => {
    if (isHovered || lightboxImage || shouldReduceMotion) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [isHovered, lightboxImage, nextSlide, shouldReduceMotion]);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxImage) {
        if (e.key === "Escape") setLightboxImage(null);
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
        return;
      }
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImage, nextSlide, prevSlide]);

  // Track mouse movement over carousel stage to add subtle 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const activeAward = items[activeIndex];

  return (
    <div className="w-full">
      {/* 3D Carousel Stage */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        className="relative min-h-[460px] w-full overflow-hidden rounded-2xl border border-line-strong bg-black/40 py-8 px-4 select-none sm:min-h-[540px] md:min-h-[600px] vl-texture-hero"
        style={{ perspective: "1200px" }}
      >
        {/* Subtle background ambient glow based on current card */}
        <div className="pointer-events-none absolute inset-0 -z-1 flex items-center justify-center opacity-30 blur-3xl">
          <div className="h-72 w-72 rounded-full bg-accent/40 transition-transform duration-700 ease-out" />
        </div>

        {/* Carousel Header / Status indicator */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-2 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            </span>
            <span className="font-sans text-xs font-semibold tracking-[0.16em] text-accent-soft uppercase">
              CARROSSEL 3D DA GALERIA DE TROFÉUS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold text-text-muted">
              {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="hidden text-xs text-text-faint sm:inline">
              (Passe o mouse ou clique para girar)
            </span>
          </div>
        </div>

        {/* Rotary Cards Container */}
        <div className="relative flex h-[340px] w-full items-center justify-center sm:h-[400px] md:h-[440px]">
          {items.map((item, index) => {
            // Calculate distance relative to activeIndex (handling circular loop)
            let offset = index - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // Limit visible cards in 3D arc to +- 3
            if (absOffset > 3) return null;

            // 3D positioning calculations
            const translateX = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 210);
            const translateZ = -absOffset * 180 + (isCenter ? 40 : 0);
            const rotateY = offset * -22 + (isCenter ? mousePos.x * 12 : 0);
            const rotateX = isCenter ? mousePos.y * -8 : 0;
            const scale = isCenter ? 1 : Math.max(0.65, 1 - absOffset * 0.15);
            const opacity = isCenter ? 1 : Math.max(0.25, 0.85 - absOffset * 0.25);
            const zIndex = 30 - absOffset * 5;

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isCenter) {
                    setLightboxImage(item);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  rotateX,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
                className={cn(
                  "absolute top-1/2 left-1/2 h-[300px] w-[210px] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-xl border transition-shadow duration-300 sm:h-[370px] sm:w-[260px] md:h-[410px] md:w-[290px]",
                  isCenter
                    ? "border-accent shadow-[0_0_35px_rgba(46,123,255,0.45)]"
                    : "border-line-strong hover:border-accent/60",
                )}
              >
                {/* Trophy Image */}
                <div className="relative h-full w-full bg-slate-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 210px, (max-width: 768px) 260px, 290px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={absOffset <= 1}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30" />

                  {/* Top Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 z-10 rounded-md border border-accent/40 bg-black/75 px-2.5 py-1 backdrop-blur-md">
                      <span className="font-sans text-[10px] font-extrabold tracking-wider text-accent-soft uppercase">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Zoom button on active card */}
                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(item);
                      }}
                      className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:scale-110"
                      title="Expandir imagem"
                      aria-label="Expandir imagem"
                    >
                      <Maximize2 size={14} />
                    </button>
                  )}

                  {/* Bottom Text Details */}
                  <div className="absolute right-0 bottom-0 left-0 z-10 p-4 text-left">
                    <h3 className="font-display text-lg leading-tight font-extrabold text-white uppercase sm:text-xl">
                      {item.title}
                    </h3>
                    {item.prize && (
                      <p className="mt-1 line-clamp-2 text-xs leading-snug text-text-muted">
                        {item.prize}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="absolute top-1/2 left-3 z-40 -translate-y-1/2 sm:left-6">
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/80 text-white backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:scale-110 active:scale-95"
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        <div className="absolute top-1/2 right-3 z-40 -translate-y-1/2 sm:right-6">
          <button
            type="button"
            onClick={nextSlide}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-bg/80 text-white backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:scale-110 active:scale-95"
            aria-label="Próximo"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Active Item Description Box */}
      <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:p-6 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-accent/40 bg-accent/20 text-accent-soft">
              <Trophy size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] font-extrabold tracking-widest text-accent-soft uppercase">
                  {activeAward.badge || "PREMIAÇÃO DA LIGA"}
                </span>
              </div>
              <h4 className="font-display text-xl font-bold uppercase text-white sm:text-2xl">
                {activeAward.title}
              </h4>
              <p className="mt-1 text-sm text-text-muted">
                {activeAward.prize}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLightboxImage(activeAward)}
            className="inline-flex flex-none items-center justify-center gap-2 rounded-lg border border-accent bg-accent/20 px-4 py-2.5 font-sans text-xs font-bold text-white transition-all hover:bg-accent hover:shadow-[0_0_20px_rgba(46,123,255,0.4)]"
          >
            <Maximize2 size={14} />
            VER IMAGEM COMPLETA
          </button>
        </div>
      </div>

      {/* Thumbnail Selector Bar */}
      <div className="mt-4 flex w-full items-center gap-2 overflow-x-auto pb-2 vl-scroll-x">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-16 flex-none overflow-hidden rounded-md border transition-all duration-300 sm:h-24 sm:w-20",
                isActive
                  ? "border-accent ring-2 ring-accent/50 scale-105"
                  : "border-line-strong opacity-50 hover:opacity-100 hover:border-white/30",
              )}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="80px"
                className="object-cover"
              />
              {isActive && (
                <div className="absolute inset-0 bg-accent/20 backdrop-brightness-110" />
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-accent/40 bg-bg p-2 shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:border-accent hover:bg-accent"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>

              <div className="relative max-h-[80vh] w-[85vw] max-w-[600px] h-[75vh] sm:h-[80vh]">
                <Image
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  fill
                  sizes="600px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="border-t border-line-strong bg-black/60 p-4 text-center backdrop-blur-md">
                <span className="font-sans text-xs font-bold text-accent-soft uppercase">
                  {lightboxImage.badge}
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                  {lightboxImage.title}
                </h3>
                {lightboxImage.prize && (
                  <p className="mt-1 text-sm text-text-muted">{lightboxImage.prize}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
