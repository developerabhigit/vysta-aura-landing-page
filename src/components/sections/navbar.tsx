"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePreOrderModal } from "@/context/pre-order-modal-context";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const { openModal } = usePreOrderModal();

  const handlePreOrder = () => {
    trackEvent("cta_click", {
      section: "navbar",
      cta_text: "Pre-Order Now",
    });
    openModal();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-black text-white">
            V
          </span>
          <span className="text-zinc-900">Vysta Aura</span>
        </Link>

        {/* Minimal Anchor Links (In-page scroll) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a href="#features" className="hover:text-zinc-950 transition-colors">
            Features
          </a>
          <a href="#specs" className="hover:text-zinc-950 transition-colors">
            Specs
          </a>
          <a href="#reviews" className="hover:text-zinc-950 transition-colors">
            Reviews
          </a>
          <a href="#faq" className="hover:text-zinc-950 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Sticky Primary CTA */}
        <div className="flex items-center gap-3">
          <Button onClick={handlePreOrder} size="sm" className="px-4">
            Pre-Order Now
          </Button>
        </div>
      </div>
    </header>
  );
}