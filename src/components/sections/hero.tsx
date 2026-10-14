import React from "react";
import { ArrowRight, Star, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContent, type HeroContent } from "@/data/landing-content";

const trustIconMap: Record<"truck" | "shield", LucideIcon> = {
  truck: Truck,
  shield: ShieldCheck,
};

interface HeroProps {
  content?: HeroContent;
}

export function Hero({ content = heroContent }: HeroProps) {
  const { badge, headline, subheadline, ctas, trustPoints, productVisual } = content;

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Social Proof Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1 text-xs font-semibold text-amber-900 mb-6">
              <div className="flex text-amber-500">
                {[...Array(badge.stars)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span>{badge.text}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.15]">
              {headline.primary}{" "}
              <span className="text-zinc-600">{headline.highlight}</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-5 text-base sm:text-lg text-zinc-700 max-w-xl leading-relaxed">
              {subheadline}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href={ctas.primary.href} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
                  {ctas.primary.text} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
              <a href={ctas.secondary.href} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {ctas.secondary.text}
                </Button>
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-zinc-700 font-medium">
              {trustPoints.map((point, index) => {
                const Icon = trustIconMap[point.icon] ?? ShieldCheck;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-zinc-400">•</span>}
                    <span className="flex items-center gap-1.5">
                      <Icon className="h-4 w-4 text-zinc-900" aria-hidden="true" /> {point.text}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-zinc-100 via-zinc-50 to-zinc-200 border border-zinc-300 p-8 flex flex-col items-center justify-center shadow-xl">

              <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-full border-[18px] border-zinc-900 shadow-2xl flex items-center justify-center bg-zinc-950">
                <div className="h-32 w-32 rounded-full border-4 border-zinc-800 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                    {productVisual.metric.label}
                  </span>
                  <span className="text-2xl font-black text-white mt-0.5">
                    {productVisual.metric.value}
                  </span>
                  <span className="text-[10px] text-zinc-300 mt-0.5">
                    {productVisual.metric.status}
                  </span>
                </div>
              </div>

              <div className="absolute top-6 left-6 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm border border-zinc-200">
                {productVisual.badges.topLeft}
              </div>
              <div className="absolute bottom-6 right-6 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm border border-zinc-200">
                {productVisual.badges.bottomRight}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}