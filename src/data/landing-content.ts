export interface HeroBadge {
  stars: number;
  text: string;
}

export interface HeroHeadline {
  primary: string;
  highlight: string;
}

export interface HeroCTAItem {
  text: string;
  href: string;
}

export interface HeroCTAs {
  primary: HeroCTAItem;
  secondary: HeroCTAItem;
}

export interface HeroTrustPoint {
  icon: "truck" | "shield";
  text: string;
}

export interface HeroProductMetric {
  label: string;
  value: string;
  status: string;
}

export interface HeroProductVisual {
  metric: HeroProductMetric;
  badges: {
    topLeft: string;
    bottomRight: string;
  };
}

export interface HeroContent {
  badge: HeroBadge;
  headline: HeroHeadline;
  subheadline: string;
  ctas: HeroCTAs;
  trustPoints: HeroTrustPoint[];
  productVisual: HeroProductVisual;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  badge?: string;
}

export interface LandingContent {
  brand: {
    name: string;
    tagline: string;
    supportEmail: string;
  };
  hero: HeroContent;
  product: {
    id: string;
    title: string;
    headline: string;
    subheadline: string;
    originalPrice: number;
    salePrice: number;
    currencySymbol: string;
    currencyCode: string;
    rating: number;
    reviewsCount: number;
    stockUrgencyText: string;
    variants: ProductVariant[];
  };
  valueProps: Array<{
    title: string;
    desc: string;
    badge: string;
  }>;
  guarantee: {
    headline: string;
    subtext: string;
  };
}

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

export const landingContent: LandingContent = {
  brand: {
    name: "Vysta Aura",
    tagline: "Aerospace Titanium Smart Ring",
    supportEmail: "concierge@vysta.io",
  },
  hero: heroContent,
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
