"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function StickyCTA() {
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
    trackEvent("click_sticky_cta", {
      item_name: "Vysta Aura Titanium Edition",
      price: 14999,
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md sm:hidden flex items-center justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Limited Batch
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-black text-zinc-950">₹14,999</span>
          <span className="text-xs text-zinc-400 line-through">₹24,999</span>
        </div>
      </div>
      <a href="#order" onClick={handleClick}>
        <Button size="sm" className="px-5 font-bold shadow-sm">
          Claim 40% Off
        </Button>
      </a>
    </div>
  );
}