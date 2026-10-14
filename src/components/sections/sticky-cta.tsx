"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { pricingContent, type PricingContent } from "@/data/landing-content";

interface StickyCTAProps {
  content?: PricingContent;
}

export function StickyCTA({ content = pricingContent }: StickyCTAProps) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      // 350px scroll hone ke baad bar visible hoga
      setShow(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  const handleClick = (): void => {
    trackEvent("cta_click", {
      section: "sticky_cta",
      item_name: content.productTitle,
      price: content.discountedPrice,
    });
  };

  const discountLabel =
    content.discountBadge.replace("Save ", "").replace(" Today", "") || "40% Off";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md sm:hidden flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          {content.batchBadge}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-black text-zinc-950">
            {content.currencySymbol}{content.discountedPrice.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-400 line-through">
            {content.currencySymbol}{content.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
      <a href="#order" onClick={handleClick}>
        <Button size="sm" className="px-5 font-bold shadow-sm">
          Claim {discountLabel}
        </Button>
      </a>
    </div>
  );
}