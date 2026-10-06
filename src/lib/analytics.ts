// lib/analytics.ts

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Type-safe structure of UTM (Contract)
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

// 2. Helper function to get UTM from URL
export function getStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utm: UTMParams = {};

    const source = urlParams.get("utm_source");
    const medium = urlParams.get("utm_medium");
    const campaign = urlParams.get("utm_campaign");
    const content = urlParams.get("utm_content");
    const term = urlParams.get("utm_term");

    if (source) utm.utm_source = source;
    if (medium) utm.utm_medium = medium;
    if (campaign) utm.utm_campaign = campaign;
    if (content) utm.utm_content = content;
    if (term) utm.utm_term = term;

    return utm;
  } catch {
    return {};
  }
}

// 3. Universal track function (which will concatenate UTM also) 
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== "undefined") {
    const utmData = getStoredUTM();

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...utmData, // UTM data will get attached automatically with every event
      ...params,
    });

    console.log(`[MarTech Event]: ${eventName}`, {
      ...utmData,
      ...params,
    });
  }
}