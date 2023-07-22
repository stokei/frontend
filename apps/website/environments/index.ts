export const NODE_ENV: string = process.env.NODE_ENV;
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";

export const CLOUDFLARE_TOKEN: string | undefined =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN;

export const STOKEI_API_BASE_URL: string =
  process.env.NEXT_PUBLIC_STOKEI_API_BASE_URL || "http://localhost:4000";

export const STOKEI_API_GRAPHQL_URL: string =
  process.env.NEXT_PUBLIC_STOKEI_API_GRAPHQL_URL ||
  "http://localhost:4000/graphql";

export const STOKEI_API_FILE_UPLOAD_URL: string =
  process.env.NEXT_PUBLIC_STOKEI_API_FILE_UPLOAD_URL ||
  "http://localhost:4000/v1/uploads/files";

export const STRIPE_PUBLISHABLE_KEY: string =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
