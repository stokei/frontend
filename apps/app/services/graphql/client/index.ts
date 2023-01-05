import { STOKEI_API_BASE_URL } from "@/environments";
import { createGraphqlClient } from "@stokei/graphql";

export interface StokeiAPIConfig {
  readonly getAccessToken: () => string | undefined;
  readonly getRefreshToken: () => string | undefined;
  readonly getAppId: () => string | undefined;
}

export const createAPIClient = (config: StokeiAPIConfig) =>
  createGraphqlClient({
    url: STOKEI_API_BASE_URL,
    isServerSide: typeof window === "undefined",
    ...config,
  });
