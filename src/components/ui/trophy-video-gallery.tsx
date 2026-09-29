"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Maximize2, X, Sparkles, Film } from "lucide-react";
import type { TrophyVideo } from "@/content/content";
import { cn } from "@/lib/utils";

interface TrophyVideoGalleryProps {
  videos: readonly TrophyVideo[];
}

type FilterCategory = "all" | "troféus" | "lances";

export function TrophyVideoGallery({ videos }: TrophyVideoGalleryProps) {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [activeVideoModal, setActiveVideoModal] = useState<TrophyVideo | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const filteredVideos = videos.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="w-full">
      {/* Header & Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line-strong pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-accent-soft" />
            <span className="font-sans text-xs font-semibold tracking-[0.16em] text-accent-soft uppercase">
              GALERIA MULTIMÍDIA
            </span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-extrabold uppercase text-white sm:text-3xl">
            Vídeos da <span className="text-accent">Vikings League</span>
          </h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-lg px-4 py-2 font-sans text-xs font-bold uppercase transition-all",
              filter === "all"
                ? "bg-accent text-white shadow-[0_0_15px_rgba(46,123,255,0.4)]"
                : "border border-line-strong bg-black/40 text-text-muted hover:border-accent/40 hover:text-white",
            )}
          >
            Todos ({videos.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("troféus")}
            className={cn(
              "rounded-lg px-4 py-2 font-sans text-xs font-bold uppercase transition-all",
              filter === "troféus"
                ? "bg-accent text-white shadow-[0_0_15px_rgba(46,123,255,0.4)]"
                : "border border-line-strong bg-black/40 text-text-muted hover:border-accent/40 hover:text-white",
            )}
          >
            🏆 Vídeos dos Troféus (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter("lances")}
            className={cn(
              "rounded-lg px-4 py-2 font-sans text-xs font-bold uppercase transition-all",
              filter === "lances"
                ? "bg-accent text-white shadow-[0_0_15px_rgba(46,123,255,0.4)]"
                : "border border-line-strong bg-black/40 text-text-muted hover:border-accent/40 hover:text-white",
            )}
          >
            ⚽ Lances e Highlights (7)
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isHovered={hoveredVideoId === video.id}
            onHoverStart={() => setHoveredVideoId(video.id)}
            onHoverEnd={() => setHoveredVideoId(null)}
            onClick={() => setActiveVideoModal(video)}
          />
        ))}
      </div>

      {/* Full Cinema Video Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <ModalVideoPlayer
            video={activeVideoModal}
            onClose={() => setActiveVideoModal(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ModalVideoPlayerProps {
  video: TrophyVideo;
  onClose: () => void;
}

function ModalVideoPlayer({ video, onClose }: ModalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.volume = 1.0;
    el.play().catch(() => {});
  }, [video]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-lg select-none"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-accent/40 bg-bg shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-strong bg-black/60 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded bg-accent/20 px-2.5 py-1 font-sans text-[10px] font-extrabold text-accent-soft uppercase">
              {video.badge}
            </span>
            <h4 className="font-display text-lg font-bold text-white uppercase sm:text-xl">
              {video.title}
            </h4>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:border-accent hover:bg-accent transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={video.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        {/* Footer */}
        <div className="border-t border-line-strong bg-bg-alt p-6">
          <p className="text-sm font-medium text-white">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface VideoCardProps {
  video: TrophyVideo;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

function VideoCard({ video, isHovered, onHoverStart, onHoverEnd, onClick }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    onHoverStart();
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    onHoverEnd();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-line-strong bg-black/40 transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_25px_rgba(46,123,255,0.25)]"
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <video
          ref={videoRef}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/30 transition-opacity duration-300 group-hover:opacity-80" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <div className="rounded border border-accent/40 bg-black/75 px-2.5 py-1 backdrop-blur-md">
            <span className="font-sans text-[10px] font-extrabold tracking-wider text-accent-soft uppercase">
              {video.badge}
            </span>
          </div>
        </div>

        {/* Play Icon / Hover Indicator */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(46,123,255,0.6)]",
            isHovered && "scale-110 border-accent bg-accent"
          )}>
            <Play size={20} className="ml-0.5 fill-white" />
          </div>
        </div>

        {/* Bottom Bar overlay */}
        <div className="absolute right-0 bottom-0 left-0 z-10 p-4">
          <h4 className="font-display text-lg font-bold text-white uppercase group-hover:text-accent-bright transition-colors">
            {video.title}
          </h4>
          {video.description && (
            <p className="mt-1 line-clamp-1 text-xs text-text-muted">
              {video.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
