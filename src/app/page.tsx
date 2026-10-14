import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { PreOrderModalProvider } from "@/context/pre-order-modal-context";
import { PreOrderModal } from "@/components/modals/pre-order-modal";

export default function Home() {
  return (
    <PreOrderModalProvider>
      <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <Navbar />
        <Hero />
        <SocialProof />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />
        <StickyCTA />
        <PreOrderModal />
      </main>
    </PreOrderModalProvider>
  );
}