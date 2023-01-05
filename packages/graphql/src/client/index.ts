import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";
import {
  ACCESS_TOKEN_HEADER_NAME,
  APP_ID_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "../constants/tokens";

export interface ClientConfig {
  readonly isServerSide: boolean;
  readonly url: string;
  readonly getAccessToken: () => string | undefined;
  readonly getRefreshToken: () => string | undefined;
  readonly getAppId: () => string | undefined;
}
export const createGraphqlClient = (config: ClientConfig) => {
  const ssrCache = ssrExchange({ isClient: !config.isServerSide });

  return {
    ssrCache,
    getInstance: () =>
      createClient({
        url: config.url,
        exchanges: [
          ssrCache,
          dedupExchange,
          cacheExchange,
          ssrCache,
          fetchExchange,
        ],
        fetchOptions: () => {
          const accessToken = config?.getAccessToken();
          const refreshToken = config?.getRefreshToken();
          const appId = config?.getAppId();
          return {
            headers: {
              ...(accessToken && {
                [ACCESS_TOKEN_HEADER_NAME]: accessToken,
              }),
              ...(refreshToken && {
                [REFRESH_TOKEN_HEADER_NAME]: refreshToken,
              }),
              ...(appId && {
                [APP_ID_HEADER_NAME]: appId,
              }),
            },
          };
        },
      }),
  };
};
