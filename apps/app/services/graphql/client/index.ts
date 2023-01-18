import { STOKEI_API_GRAPHQL_URL } from "@/environments";
import { createGraphqlClient } from "@stokei/graphql";

export interface StokeiAPIConfig {
  readonly getAppId: () => string | undefined;
  readonly onLogout: () => void;
}

export const createAPIClient = (config: StokeiAPIConfig) =>
  createGraphqlClient({
    url: STOKEI_API_GRAPHQL_URL,
    isServerSide: typeof window === "undefined",
    ...config,
  });
