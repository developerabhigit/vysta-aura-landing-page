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
  faq: FAQContent;
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
