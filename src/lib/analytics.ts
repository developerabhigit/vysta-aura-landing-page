// src/lib/analytics.ts

import { martechConfig } from "@/config/martech.config";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    clarity?: (action: string, key: string, value: string) => void;
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

const UTM_SESSION_KEY = "vysta_utm_data";

// Helper function to get UTM from URL
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

    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(utm));
      return utm;
    }

    const cached = sessionStorage.getItem(UTM_SESSION_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

// Universal track function (which will concatenate UTM also)
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  const utmData = getStoredUTM();
  const fullPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...utmData,
    ...params,
  };

  // Local development QA output
  console.log(`[MarTech Event]: ${eventName}`, fullPayload);

  // Stop real dispatch if tracking is disabled (e.g. on localhost)
  if (!martechConfig.isTrackingEnabled) {
    return;
  }

  // 1. Google Tag Manager / GA4 DataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(fullPayload);

  // 2. Microsoft Clarity Smart Tagging
  if (typeof window.clarity === "function") {
    window.clarity("set", "last_event", eventName);
    if (params?.variant) {
      window.clarity("set", "selected_variant", String(params.variant));
    }
    if (utmData.utm_source) {
      window.clarity("set", "utm_source", utmData.utm_source);
    }
    if (utmData.utm_campaign) {
      window.clarity("set", "utm_campaign", utmData.utm_campaign);
    }
  }
}