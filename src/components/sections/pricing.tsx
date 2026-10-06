"use client";

import { useState } from "react";
import { Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

// 1. Color Variant ka Type-Safe Interface
interface ColorVariant {
  id: string;
  name: string;
  badgeColor: string;
  ringClass: string;
}

const colorVariants: ColorVariant[] = [
  {
    id: "matte-black",
    name: "Matte Black",
    badgeColor: "bg-zinc-950",
    ringClass: "ring-zinc-950 text-zinc-950 border-zinc-950",
  },
  {
    id: "silver-titanium",
    name: "Silver Titanium",
    badgeColor: "bg-zinc-400",
    ringClass: "ring-zinc-500 text-zinc-800 border-zinc-500",
  },
  {
    id: "rose-gold",
    name: "Rose Gold",
    badgeColor: "bg-amber-300",
    ringClass: "ring-amber-500 text-amber-900 border-amber-500",
  },
];

const includedItems: string[] = [
  "Aerospace Grade Titanium Smart Ring",
  "Complimentary Free Sizing Kit (shipped first)",
  "Magnetic Fast-Charging Dock + Braided USB-C Cable",
  "Lifetime App Access (Zero Monthly Subscriptions)",
  "1-Year Comprehensive Hardware Warranty",
];

export function Pricing() {
  // 2. Active Selected Color State
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(colorVariants[0]);

  const handleColorSelect = (variant: ColorVariant): void => {
    setSelectedColor(variant);
    trackEvent("select_item_variant", {
      variant_name: variant.name,
      variant_id: variant.id,
    });
  };

  const handlePreOrder = (): void => {
    trackEvent("begin_checkout", {
      item_name: "Vysta Aura Titanium Edition",
      selected_variant: selectedColor.name,
      price: 14999,
      currency: "INR",
      discount: "40%",
    });
    
    alert(`Redirecting to Secure Checkout for [${selectedColor.name}]...`);
  };

  return (
    <section id="order" className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
            Limited Launch Batch
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
            Secure Your Vysta Aura
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-700">
            Lock in launch pricing today. Receive the sizing kit first, confirm your fit, and get your custom ring.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="rounded-3xl border-2 border-zinc-900 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 border-b border-zinc-200">
            <div>
              <h3 className="text-2xl font-extrabold text-zinc-950">Vysta Aura Titanium Edition</h3>
              <p className="text-xs text-zinc-600 mt-1">Select your preferred titanium finish below</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-zinc-500 font-semibold" aria-label="Original price ₹24,999">₹24,999</span>
                <span className="text-3xl sm:text-4xl font-black text-zinc-950">₹14,999</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Save 40% Today</span>
            </div>
          </div>

          {/* Color Selector Pills */}
          <div className="py-6 border-b border-zinc-100">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-3">
              Finish: <span className="text-zinc-950 font-extrabold">{selectedColor.name}</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {colorVariants.map((variant: ColorVariant) => {
                const isSelected = selectedColor.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => handleColorSelect(variant)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
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

          {/* Included Items */}
          <div className="py-6">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-700 mb-4">
              What&apos;s Included In The Box:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-800">
              {includedItems.map((item: string, idx: number) => (
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
              Pre-Order {selectedColor.name} — ₹14,999
            </Button>
            <p className="text-center text-xs text-zinc-600">
              Free Express Delivery in 2-4 business days. COD available.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-zinc-700">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-4 w-4 text-zinc-900" aria-hidden="true" />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="h-4 w-4 text-zinc-900" aria-hidden="true" />
              <span>30-Day Hassle-Free Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-zinc-900" aria-hidden="true" />
              <span>1-Year Official Warranty</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}