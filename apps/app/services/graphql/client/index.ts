import { STOKEI_API_GRAPHQL_URL } from "@/environments";
import { createGraphqlClient } from "@stokei/graphql";

export interface StokeiAPIConfig {
  readonly isServerSide?: boolean;
  readonly appId?: string;
  readonly onLogout?: () => void;
}

export const createAPIClient = (config: StokeiAPIConfig) =>
  createGraphqlClient({
    url: STOKEI_API_GRAPHQL_URL,
    isServerSide:
      typeof config?.isServerSide === "boolean"
        ? config?.isServerSide
        : typeof window === "undefined",
    ...config,
  });
