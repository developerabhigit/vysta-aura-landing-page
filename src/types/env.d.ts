declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SITE_URL: string;
    readonly NEXT_PUBLIC_GTM_ID?: string;
    readonly NEXT_PUBLIC_CLARITY_ID?: string;
    readonly NODE_ENV: "development" | "production" | "test";
  }
}