import { makeOperation } from "@urql/core";
import { authExchange } from "@urql/exchange-auth";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import {
  ACCESS_TOKEN_HEADER_NAME,
  APP_ID_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "../constants/tokens";
import {
  refreshAccessMutationSchema,
  RefreshAccessMutationSchemaResponse,
} from "../schemas";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../services";

export interface ClientConfig {
  readonly isServerSide: boolean;
  readonly url: string;
  readonly appId?: string;
  readonly onLogout?: () => void;
}

export const createGraphqlClient = (config: ClientConfig) => {
  const ssrCache = ssrExchange({ isClient: !config.isServerSide });

  const exchanges = [
    ssrCache,
    dedupExchange,
    cacheExchange,
    ssrCache,
    authExchange({
      willAuthError({ operation }) {
        const routesWithoutRefreshAccess: string[] = [
          "login",
          "signUp",
          "refreshAccess",
        ];
        return !(
          operation.kind === "mutation" &&
          operation.query.definitions.some((definition) => {
            return (
              definition.kind === "OperationDefinition" &&
              definition.selectionSet.selections.some((node) => {
                return (
                  node.kind === "Field" &&
                  routesWithoutRefreshAccess.includes(node.name.value)
                );
              })
            );
          })
        );
      },
      didAuthError({ error }) {
        const isAuthError = error.graphQLErrors.some(
          (e) => e.extensions?.code === "invalidToken"
        );
        if (isAuthError) {
          removeAccessToken();
          removeRefreshToken();

          config?.onLogout?.();
        }
        return false;
      },
      addAuthToOperation({ operation }) {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        const appId = config?.appId;
        const fetchOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions?.()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions?.headers,
              [ACCESS_TOKEN_HEADER_NAME]: accessToken,
              [REFRESH_TOKEN_HEADER_NAME]: refreshToken,
              [APP_ID_HEADER_NAME]: appId,
            },
          },
        });
      },
      async getAuth({ authState, mutate }) {
        const appId = config?.appId;

        const responseRefreshAccessMutation =
          await mutate<RefreshAccessMutationSchemaResponse>(
            refreshAccessMutationSchema
          );

        if (responseRefreshAccessMutation.data?.response) {
          setAccessToken(
            responseRefreshAccessMutation.data.response.accessToken,
            responseRefreshAccessMutation.data.response.prefixToken
          );
          setRefreshToken(
            responseRefreshAccessMutation.data.response.refreshToken
          );
          let accessToken: string =
            responseRefreshAccessMutation.data.response.accessToken;
          if (responseRefreshAccessMutation.data.response.prefixToken) {
            accessToken =
              responseRefreshAccessMutation.data.response.prefixToken +
              " " +
              responseRefreshAccessMutation.data.response.accessToken;
          }

          return {
            ...(authState as any),
            appId,
            accessToken,
            refreshToken:
              responseRefreshAccessMutation.data.response.refreshToken,
          };
        }

        return null;
      },
    }),
    fetchExchange,
  ];

  return {
    ssrCache,
    api: createClient({
      url: config.url,
      exchanges,
      fetchOptions: () => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        const appId = config?.appId;
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
