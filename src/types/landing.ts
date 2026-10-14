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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  badge: string;
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface PricingVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  badgeColor: string;
  badge?: string;
}

export interface PricingTrustBadge {
  icon: "truck" | "refresh" | "shield";
  text: string;
}

export interface PricingContent {
  batchBadge: string;
  title: string;
  subtitle: string;
  productTitle: string;
  productSubtitle: string;
  originalPrice: number;
  discountedPrice: number;
  currencySymbol: string;
  currencyCode: string;
  discountBadge: string;
  variants: PricingVariant[];
  foundersPerks: string[];
  guaranteeText: string;
  ctaText: string;
  shippingNote: string;
  trustBadges: PricingTrustBadge[];
}

export interface FeatureItem {
  icon: "moon" | "shield" | "battery" | "activity";
  title: string;
  description: string;
}

export interface FeaturesContent {
  badge: string;
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface SocialProofMetric {
  icon: "heart" | "battery" | "award" | "sparkles";
  value: string;
  label: string;
}

export interface SocialProofReview {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface SocialProofContent {
  publicationsTitle: string;
  publications: string[];
  metrics: SocialProofMetric[];
  earlyReview?: SocialProofReview;
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
  socialProof: SocialProofContent;
  features: FeaturesContent;
  faq: FAQContent;
  pricing: PricingContent;
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
