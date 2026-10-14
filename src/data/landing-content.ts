import type {
  HeroContent,
  FAQContent,
  PricingContent,
  LandingContent,
} from "@/types/landing";

// Re-export all schema types for convenience and backwards compatibility
export type * from "@/types/landing";

export const heroContent: HeroContent = {
  badge: {
    stars: 5,
    text: "Rated 4.9/5 by 3,400+ Active Users",
  },
  headline: {
    primary: "Next-Gen Health Tracking.",
    highlight: "Zero Distractions.",
  },
  subheadline:
    "Meet Vysta Aura — crafted from aerospace titanium. Monitor sleep, heart rate variability, and recovery metrics 24/7 with medical-grade precision.",
  ctas: {
    primary: {
      text: "Claim Yours — 40% Off",
      href: "#order",
    },
    secondary: {
      text: "Explore Specs",
      href: "#specs",
    },
  },
  trustPoints: [
    {
      icon: "truck",
      text: "Free Shipping",
    },
    {
      icon: "shield",
      text: "30-Day Money Back Guarantee",
    },
  ],
  productVisual: {
    metric: {
      label: "Recovery",
      value: "94%",
      status: "Optimal State",
    },
    badges: {
      topLeft: "⚡ 7-Day Battery",
      bottomRight: "💧 50m Water Resistant",
    },
  },
};

export const faqContent: FAQContent = {
  badge: "Frequently Asked Questions",
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know before ordering.",
  items: [
    {
      question: "How does the free sizing kit work and how do I find my size?",
      answer:
        "Every order includes a complimentary Sizing Kit shipped first. Wear sample rings for 24 hours to ensure a comfortable fit across daytime and sleeping, confirm your size in the app, and we'll dispatch your custom titanium ring immediately.",
    },
    {
      question: "Is there really zero monthly subscription fee for the app?",
      answer:
        "Zero subscriptions, 100% free forever. Unlike other smart rings that charge ₹500–₹1,000 every month just to view your health data, Vysta Aura includes lifetime access to all biometric analytics, sleep stage analysis, and recovery tracking with no paywalls or hidden charges.",
    },
    {
      question: "What is the battery life and how does charging work?",
      answer:
        "Vysta Aura delivers up to 7 full days of continuous biometric telemetry on a single charge. The included magnetic charging dock powers the ring to 100% in approximately 60 minutes, so a quick top-up once a week is all you need.",
    },
    {
      question: "Can I wear Vysta Aura while swimming, showering, or working out?",
      answer:
        "Yes. Vysta Aura is 5 ATM water-resistant (submersible up to 50 meters). You can safely wear it in the shower, swimming pool, ocean, or during high-intensity sweat sessions without taking it off.",
    },
    {
      question: "How does Vysta Aura compare to smartwatches?",
      answer:
        "Vysta Aura delivers medical-grade biometric accuracy directly from the digital arteries of the finger with zero screen distractions, zero notification fatigue, and a 7-day battery life compared to daily smartwatch charging.",
    },
    {
      question: "What is your return policy and warranty?",
      answer:
        "We offer a 30-Night Risk-Free Sleep Trial. If you don't feel a measurable difference in your sleep and recovery insights, return it for a 100% full refund with free return pickup. Every ring also includes a 1-year comprehensive hardware warranty.",
    },
  ],
};

export const pricingContent: PricingContent = {
  batchBadge: "Limited Launch Batch",
  title: "Secure Your Vysta Aura",
  subtitle:
    "Lock in launch pricing today. Receive the sizing kit first, confirm your fit, and get your custom ring.",
  productTitle: "Vysta Aura Titanium Edition",
  productSubtitle: "Select your preferred titanium finish below",
  originalPrice: 24999,
  discountedPrice: 14999,
  currencySymbol: "₹",
  currencyCode: "INR",
  discountBadge: "Save 40% Today",
  variants: [
    {
      id: "matte-black",
      name: "Matte Black",
      colorName: "Stealth Obsidian",
      colorHex: "#18181b",
      badgeColor: "bg-zinc-950",
      badge: "Best Seller",
    },
    {
      id: "silver-titanium",
      name: "Silver Titanium",
      colorName: "Raw Aerospace Silver",
      colorHex: "#e4e4e7",
      badgeColor: "bg-zinc-400",
    },
    {
      id: "rose-gold",
      name: "Rose Gold",
      colorName: "18K Brushed Rose Gold",
      colorHex: "#e0a899",
      badgeColor: "bg-amber-300",
    },
  ],
  foundersPerks: [
    "Aerospace Grade Titanium Smart Ring",
    "Complimentary Free Sizing Kit (shipped first)",
    "Magnetic Fast-Charging Dock + Braided USB-C Cable",
    "Lifetime App Access (Zero Monthly Subscriptions)",
    "1-Year Comprehensive Hardware Warranty",
    "Founder's Priority OTA Firmware Access",
  ],
  guaranteeText:
    "Risk-Free 30-Night Sleep Trial: If you don't feel a measurable difference in your sleep, return it for a full refund. We even pay for return pickup.",
  ctaText: "Pre-Order",
  shippingNote: "Free Express Delivery in 2-4 business days. COD available.",
  trustBadges: [
    {
      icon: "truck",
      text: "Free Shipping",
    },
    {
      icon: "refresh",
      text: "30-Day Hassle-Free Returns",
    },
    {
      icon: "shield",
      text: "1-Year Official Warranty",
    },
  ],
};

export const landingContent: LandingContent = {
  brand: {
    name: "Vysta Aura",
    tagline: "Aerospace Titanium Smart Ring",
    supportEmail: "concierge@vysta.io",
  },
  hero: heroContent,
  faq: faqContent,
  pricing: pricingContent,
  product: {
    id: "vysta-aura-gen1",
    title: "Vysta Aura Smart Ring",
    headline: "Clinical Biometrics. Zero Screen Distractions.",
    subheadline:
      "Engineered from grade-5 aerospace titanium. Continuous HRV, clinical sleep stage tracking, and 7-day battery life with zero subscription fees.",
    originalPrice: 24999,
    salePrice: 14999,
    currencySymbol: "₹",
    currencyCode: "INR",
    rating: 4.8,
    reviewsCount: 1280,
    stockUrgencyText: "High Demand: Only 14 units remaining for this shipping batch",
    variants: [
      {
        id: "matte-black",
        name: "Matte Black",
        colorName: "Stealth Obsidian",
        colorHex: "#18181b",
        badge: "Best Seller",
      },
      {
        id: "silver-titanium",
        name: "Silver Titanium",
        colorName: "Raw Aerospace Silver",
        colorHex: "#e4e4e7",
      },
      {
        id: "rose-gold",
        name: "Rose Gold",
        colorName: "18K Brushed Rose Gold",
        colorHex: "#e0a899",
      },
    ],
  },
  valueProps: [
    {
      title: "Medical-Grade Sleep Staging",
      desc: "Deep, REM, and light sleep analysis with real-time recovery scoring.",
      badge: "98.4% Clinical Match",
    },
    {
      title: "24/7 Autonomous HRV",
      desc: "Continuous heart rate variability to predict physical and mental burnout.",
      badge: "Every 5 Minutes",
    },
    {
      title: "Zero Monthly Fees",
      desc: "No paywalls or subscription traps. Full biometric analytics free for life.",
      badge: "100% Free Forever",
    },
  ],
  guarantee: {
    headline: "Risk-Free 30-Night Sleep Trial",
    subtext:
      "If you don't feel a measurable difference in your sleep, return it for a full refund. We even pay for return pickup.",
  },
};

export const siteConfig = landingContent;
