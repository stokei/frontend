import { DEFAULT_APP_ID } from "@/constants/default-app-id";
import { STOKEI_API_GRAPHQL_URL } from "@/environments";
import {
  getServerSideAccessToken,
  getServerSideRefreshToken,
} from "@/services/cookies";
import { onLogout } from "@/utils";
import {
  createGraphqlClient,
  getAccessToken,
  getRefreshToken,
} from "@stokei/graphql";

export interface StokeiAPIConfig {
  readonly cookies?: Record<string, string | undefined>;
  readonly appId?: string;
}

export const createAPIClient = (config?: StokeiAPIConfig) =>
  createGraphqlClient({
    ...config,
    appId: config?.appId || DEFAULT_APP_ID,
    onLogout,
    getAccessToken: () => {
      if (config?.cookies) {
        return getServerSideAccessToken(config?.cookies);
      }
      return getAccessToken();
    },
    getRefreshToken: () => {
      if (config?.cookies) {
        return getServerSideRefreshToken(config?.cookies);
      }
      return getRefreshToken();
    },
    url: STOKEI_API_GRAPHQL_URL,
    isServerSide: typeof window === "undefined",
  });
