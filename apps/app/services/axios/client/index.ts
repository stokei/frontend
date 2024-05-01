import { STOKEI_API_BASE_URL } from "@/environments";
import {
  getServerSideAccessToken,
  getServerSideRefreshToken,
} from "@/services/cookies";
import { createAPIClient } from "@/services/graphql/client";
import { RefreshAccessDocument } from "@/services/graphql/mutations/refresh-token/refresh-token.mutation.graphql.generated";
import { onLogout } from "@/utils";
import {
  ACCESS_TOKEN_HEADER_NAME,
  APP_ID_HEADER_NAME,
  getAccessToken,
  getRefreshToken,
  isAuthError,
  REFRESH_TOKEN_HEADER_NAME,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@stokei/graphql";
import axios from "axios";

export interface StokeiAPIConfig {
  readonly cookies?: Record<string, string | undefined>;
  readonly appId?: string;
}

export const createAxiosAPIClient = (config?: StokeiAPIConfig) => {
  const getClientAccessToken = () => {
    if (config?.cookies) {
      return getServerSideAccessToken(config?.cookies);
    }
    return getAccessToken();
  };
  const getClientRefreshToken = () => {
    if (config?.cookies) {
      return getServerSideRefreshToken(config?.cookies);
    }
    return getRefreshToken();
  };

  const stokeiClient = createAPIClient({
    appId: config?.appId,
    cookies: config?.cookies,
  });

  const baseURL = STOKEI_API_BASE_URL + "/v1";
  const apiClient = axios.create({
    baseURL,
    headers: {
      [ACCESS_TOKEN_HEADER_NAME]: getClientAccessToken(),
      [REFRESH_TOKEN_HEADER_NAME]: getClientRefreshToken(),
      [APP_ID_HEADER_NAME]: config?.appId,
    },
  });
  const publicApiClient = axios.create({
    baseURL,
    headers: {
      [APP_ID_HEADER_NAME]: config?.appId,
    },
  });

  apiClient.interceptors.request.use(
    (request) => {
      const accessToken = getClientAccessToken();
      const refreshToken = getClientRefreshToken();

      if (accessToken) {
        request.headers[ACCESS_TOKEN_HEADER_NAME] = accessToken;
      }
      if (refreshToken) {
        request.headers[REFRESH_TOKEN_HEADER_NAME] = refreshToken;
      }
      if (config?.appId) {
        request.headers[APP_ID_HEADER_NAME] = config?.appId;
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const isUnauthorized = error.response?.status === 401;
      if (isUnauthorized) {
        const responseRefreshAccessMutation = await stokeiClient.api
          .mutation(RefreshAccessDocument, {})
          .toPromise();
        if (responseRefreshAccessMutation?.data?.response) {
          const refreshAccessData =
            responseRefreshAccessMutation?.data.response;
          setAccessToken(
            refreshAccessData.accessToken,
            refreshAccessData.prefixToken
          );
          setRefreshToken(refreshAccessData.refreshToken);
          return;
        }
        const hasAuthError =
          responseRefreshAccessMutation?.error?.graphQLErrors.some((e) =>
            isAuthError((e.extensions?.code as string) || "")
          );
        if (hasAuthError) {
          removeAccessToken();
          removeRefreshToken();
          onLogout();
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    apiClient,
    publicApiClient,
  };
};
