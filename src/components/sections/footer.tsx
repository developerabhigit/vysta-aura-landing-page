import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-black text-zinc-950">
            V
          </span>
          <span className="font-bold text-white text-base tracking-tight">Vysta Aura</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#order" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">Privacy Policy</span>
          <span className="text-zinc-300">Terms of Service</span>
        </div>

        <div className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Vysta Technologies Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
}