import { RevealSection } from "@/components/ui/reveal-section";
import { RevealWords } from "@/components/ui/reveal-words";
import { TrophyVideoGallery } from "@/components/ui/trophy-video-gallery";
import { awards } from "@/content/content";

export function VideoGallerySection() {
  if (!awards.videos || awards.videos.length === 0) return null;

  return (
    <RevealSection
      id="sv"
      className="border-b border-line bg-bg px-[clamp(18px,3vw,44px)] py-[clamp(44px,5.5vw,88px)] vl-texture overflow-hidden"
    >
      <div className="mx-auto max-w-[1240px]">
        <div
          data-stagger
          className="mb-[18px] font-sans text-[10px] font-semibold tracking-[0.2em] text-text-dim"
        >
          GALERIA MULTIMÍDIA
        </div>
        <h2
          className="mb-[clamp(30px,4vw,56px)] font-display text-[clamp(28px,4.2vw,56px)] leading-[0.9] font-extrabold uppercase"
        >
          <RevealWords
            segments={[{ text: "Vídeos e Lances da " }, { text: "Vikings League", accent: true }]}
          />
        </h2>

        {/* Video Gallery */}
        <div data-stagger className="w-full">
          <TrophyVideoGallery videos={awards.videos} />
        </div>
      </div>
    </RevealSection>
  );
}
