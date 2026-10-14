import { Award, BatteryCharging, HeartPulse, Sparkles, Star, type LucideIcon } from "lucide-react";
import { socialProofContent, type SocialProofContent, type SocialProofMetric } from "@/data/landing-content";

const metricIconMap: Record<"heart" | "battery" | "award" | "sparkles", LucideIcon> = {
  heart: HeartPulse,
  battery: BatteryCharging,
  award: Award,
  sparkles: Sparkles,
};

interface SocialProofProps {
  content?: SocialProofContent;
}

export function SocialProof({ content = socialProofContent }: SocialProofProps) {
  const { publicationsTitle, publications, metrics, earlyReview } = content;

  return (
    <section className="border-y border-zinc-200 bg-zinc-50/70 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Media / Press Recognition */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-wider text-zinc-700 uppercase">
            {publicationsTitle}
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-8 sm:gap-14 text-zinc-600 font-bold text-sm sm:text-base tracking-tight">
            {publications.map((item: string, index: number) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-zinc-200 mb-8" />

        {/* 4-Column Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((item: SocialProofMetric, index: number) => {
            const Icon = metricIconMap[item.icon] ?? Sparkles;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 text-zinc-900">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-700 mt-1 font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Early Review / Rating Highlight */}
        {earlyReview && (
          <div className="mt-10 pt-8 border-t border-zinc-200/80 max-w-2xl mx-auto text-center px-4">
            <div className="flex justify-center text-amber-500 mb-2.5">
              {[...Array(earlyReview.rating)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="text-sm italic text-zinc-700 leading-relaxed font-medium">
              &ldquo;{earlyReview.quote}&rdquo;
            </p>
            <p className="text-xs font-semibold text-zinc-950 mt-2">
              {earlyReview.author} — <span className="text-zinc-600 font-normal">{earlyReview.role}</span>
            </p>
          </div>
        )}

      </div>
    </section>
  );
}