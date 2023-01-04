import { STOKEI_API_BASE_URL } from "@/environments";
import { createGraphqlClient } from "@stokei/graphql";

export interface StokeiAPIConfig {
  readonly getAccessToken: () => string;
  readonly getRefreshToken: () => string;
  readonly getAppId: () => string;
}

export const createAPIClient = (config: StokeiAPIConfig) =>
  createGraphqlClient({
    url: STOKEI_API_BASE_URL,
    isServerSide: typeof window === "undefined",
    ...config,
  });
