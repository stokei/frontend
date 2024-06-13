// ---------- ENVIRONMENT ----------
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE_ENV !== "development";

// ---------- SERVER ----------
export const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY || "";
