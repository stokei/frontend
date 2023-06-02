import { env } from "process";

export const NODE_ENV: string = env.NODE_ENV;
export const IS_PRODUCTION: boolean = env.NODE_ENV === "production";

export const CLOUDFLARE_TOKEN: string | undefined =
  env.NEXT_PUBLIC_CLOUDFLARE_TOKEN;

export const DOMAIN: string = env.NEXT_PUBLIC_DOMAIN || "stokei.app";

export const STOKEI_API_BASE_URL: string =
  env.NEXT_PUBLIC_STOKEI_API_BASE_URL || "http://localhost:4000";

export const STOKEI_API_GRAPHQL_URL: string =
  env.NEXT_PUBLIC_STOKEI_API_GRAPHQL_URL || "http://localhost:4000/graphql";

export const STRIPE_PUBLISHABLE_KEY: string =
  env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
