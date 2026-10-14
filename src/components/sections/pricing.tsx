"use client";

import { useState } from "react";
import { Check, ShieldCheck, Truck, RefreshCw, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { pricingContent, type PricingContent, type PricingVariant } from "@/data/landing-content";
import { usePreOrderModal } from "@/context/pre-order-modal-context";

const pricingIconMap: Record<"truck" | "refresh" | "shield", LucideIcon> = {
  truck: Truck,
  refresh: RefreshCw,
  shield: ShieldCheck,
};

interface PricingProps {
  content?: PricingContent;
}

export function Pricing({ content = pricingContent }: PricingProps) {
  const { openModal } = usePreOrderModal();

  const {
    batchBadge,
    title,
    subtitle,
    productTitle,
    productSubtitle,
    originalPrice,
    discountedPrice,
    currencySymbol,
    currencyCode,
    discountBadge,
    variants,
    foundersPerks,
    guaranteeText,
    ctaText,
    shippingNote,
    trustBadges,
  } = content;

  // Active Selected Finish State
  const [selectedColor, setSelectedColor] = useState<PricingVariant>(variants[0]);

  const handleColorSelect = (variant: PricingVariant): void => {
    setSelectedColor(variant);
    trackEvent("select_item_variant", {
      variant_name: variant.name,
      variant_id: variant.id,
    });
  };

  const handlePreOrder = (): void => {
    trackEvent("begin_checkout", {
      section: "pricing",
      item_name: productTitle,
      selected_variant: selectedColor.name,
      price: discountedPrice,
      currency: currencyCode,
      discount: discountBadge,
    });

    openModal(selectedColor.id);
  };

  return (
    <section id="order" className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
            {batchBadge}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-700">
            {subtitle}
          </p>
        </div>

        {/* Pricing Card */}
        <div className="rounded-3xl border-2 border-zinc-900 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 border-b border-zinc-200">
            <div>
              <h3 className="text-2xl font-extrabold text-zinc-950">{productTitle}</h3>
              <p className="text-xs text-zinc-600 mt-1">{productSubtitle}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-sm line-through text-zinc-500 font-semibold"
                  aria-label={`Original price ${currencySymbol}${originalPrice.toLocaleString()}`}
                >
                  {currencySymbol}{originalPrice.toLocaleString()}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-zinc-950">
                  {currencySymbol}{discountedPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                {discountBadge}
              </span>
            </div>
          </div>

          {/* Color Selector Pills */}
          <div className="py-6 border-b border-zinc-100">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-3">
              Finish: <span className="text-zinc-950 font-extrabold">{selectedColor.name}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {variants.map((variant: PricingVariant) => {
                const isSelected = selectedColor.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => handleColorSelect(variant)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${isSelected
                      ? "border-zinc-950 bg-zinc-950 text-white shadow-sm ring-1 ring-zinc-950"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
                      }`}
                  >
                    <span className={`h-3 w-3 rounded-full border border-black/10 ${variant.badgeColor}`} />
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Founder's Edition Perks */}
          <div className="py-6">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-4">
              Founder&apos;s Edition Perks &amp; In-Box Items:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-800">
              {foundersPerks.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 shrink-0 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full text-base font-bold py-4 active:scale-[0.99] transition-transform"
              onClick={handlePreOrder}
            >
              {ctaText} {selectedColor.name} — {currencySymbol}{discountedPrice.toLocaleString()}
            </Button>
            <p className="text-center text-xs text-zinc-600">
              {shippingNote}
            </p>
          </div>

          {/* Guarantee Banner */}
          <div className="mt-5 rounded-xl bg-amber-50/70 border border-amber-200/90 p-3.5 text-center text-xs text-amber-950 leading-relaxed font-medium">
            🛡️ <span className="font-semibold">{guaranteeText}</span>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-zinc-200 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-zinc-700">
            {trustBadges.map((badge, idx) => {
              const Icon = pricingIconMap[badge.icon] ?? ShieldCheck;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <Icon className="h-4 w-4 text-zinc-900" aria-hidden="true" />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}