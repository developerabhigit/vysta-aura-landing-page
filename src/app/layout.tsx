import type { Metadata } from "next";
import { martechConfig } from "@/config/martech.config";
import Script from "next/script";
import "./globals.css";

const SITE_URL: string = martechConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Vysta Aura - Precision Health & Biometric Smart Ring",
  description:
    "Crafted from aerospace titanium. Medical-grade sleep, continuous HRV, and 7-day battery life with zero subscription fees.",
  alternates: {
    canonical: "/", // On-Page SEO: Canonical Tag
  },
  openGraph: {
    title: "Vysta Aura - Aerospace Titanium Smart Ring (40% Off)",
    description:
      "Medical-grade sleep, continuous HRV, and 7-day battery life with zero screen distractions. Free sizing kit included.",
    url: SITE_URL,
    siteName: "Vysta Technologies",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vysta Aura Aerospace Titanium Smart Ring",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vysta Aura - Precision Health Smart Ring",
    description:
      "Medical-grade biometric tracking with zero monthly subscription.",
    images: ["/og-image.jpg"],
  },
};

// Technical SEO: Rich Snippet Schema for Google Search
const productSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Vysta Aura Smart Ring",
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Aerospace-grade titanium biometric smart ring with continuous HRV, sleep tracking, and 7-day battery.",
  brand: {
    "@type": "Brand",
    name: "Vysta",
  },
  offers: {
    "@type": "Offer",
    url: SITE_URL,
    priceCurrency: "INR",
    price: "14999",
    priceValidUntil: "2027-12-31",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1280",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>

        {/* Google Tag Manager Script */}
        {martechConfig.gtmId && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${martechConfig.gtmId}');
              `,
            }}
          />
        )}

        {/* Microsoft Clarity Script */}
        {martechConfig.clarityId && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${martechConfig.clarityId}");
              `,
            }}
          />
        )}

        {/* Technical SEO: Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
      <body
        className="antialiased selection:bg-zinc-900 selection:text-white"
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${martechConfig.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}