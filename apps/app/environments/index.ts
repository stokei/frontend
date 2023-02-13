export const NODE_ENV: string = process.env.NODE_ENV;
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";

export const CLOUDFLARE_TOKEN: string | undefined =
  process.env.CLOUDFLARE_TOKEN;

export const DOMAIN: string = process.env.DOMAIN || "stokei.app";

export const STOKEI_API_BASE_URL: string =
  process.env.STOKEI_API_BASE_URL || "http://localhost:4000";

export const STOKEI_API_GRAPHQL_URL: string =
  process.env.STOKEI_API_GRAPHQL_URL || "http://localhost:4000/graphql";

export const STRIPE_PUBLISHABLE_KEY: string =
  process.env.STRIPE_PUBLISHABLE_KEY || "";
