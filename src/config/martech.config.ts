// src/config/martech.config.ts

export interface MartechConfig {
  siteUrl: string;
  gtmId?: string;
  clarityId?: string;
  isTrackingEnabled: boolean;
}

export const martechConfig: MartechConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000", // Reads from ENV; falls back to localhost if not set in dev
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID?.trim() || undefined,

  // Tracking only activates in production when at least one tracking ID exists
  isTrackingEnabled:
    process.env.NODE_ENV === "production" &&
    Boolean(
      process.env.NEXT_PUBLIC_GTM_ID?.trim() ||
      process.env.NEXT_PUBLIC_CLARITY_ID?.trim()
    ),
};