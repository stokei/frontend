import { AnyVariables, makeOperation, OperationResult } from "@urql/core";
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
import { isAuthError } from "../utils";

export interface ClientConfig {
  readonly isServerSide: boolean;
  readonly url: string;
  readonly appId?: string;
  readonly getAccessToken: () => string | undefined;
  readonly getRefreshToken: () => string | undefined;
  readonly onLogout?: () => void;
}

export const createGraphqlClient = (config: ClientConfig) => {
  const ssrCache = ssrExchange({ isClient: !config.isServerSide });

  const exchanges = [
    ssrCache,
    dedupExchange,
    cacheExchange,
    authExchange({
      willAuthError({ operation, authState }) {
        const routesWithoutRefreshAccess: string[] = [
          "login",
          "signUp",
          "refreshAccess",
        ];
        const isAllowedToRefreshAccess = !(
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
        return isAllowedToRefreshAccess;
      },
      addAuthToOperation({ operation, authState }) {
        const { accessToken, refreshToken, appId }: any = authState || {};

        if (!accessToken || !refreshToken) {
          return operation;
        }

        const fetchOptions: any =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions?.()
            : operation.context.fetchOptions || {};

        const headers = new Headers();
        headers.append(ACCESS_TOKEN_HEADER_NAME, accessToken);
        headers.append(REFRESH_TOKEN_HEADER_NAME, refreshToken);
        headers.append(APP_ID_HEADER_NAME, appId);

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions?.headers,
              ...headers,
            },
          },
        });
      },
      async getAuth({ authState, mutate }) {
        const accessToken = config?.getAccessToken();
        const refreshToken = config?.getRefreshToken();
        const appId = config?.appId;

        const currentAuthState: any = authState;

        const responseRefreshAccessMutation: OperationResult<
          RefreshAccessMutationSchemaResponse,
          AnyVariables
        > = await mutate(
          refreshAccessMutationSchema,
          {},
          {
            fetchOptions: {
              headers: {
                [ACCESS_TOKEN_HEADER_NAME]: accessToken || "",
                [REFRESH_TOKEN_HEADER_NAME]: refreshToken || "",
                [APP_ID_HEADER_NAME]: appId || "",
              },
            },
          }
        );

        if (responseRefreshAccessMutation.data?.response) {
          const refreshAccessData = responseRefreshAccessMutation.data.response;
          const newAccessToken = setAccessToken(
            refreshAccessData.accessToken,
            refreshAccessData.prefixToken
          );
          const newRefreshToken = setRefreshToken(
            refreshAccessData.refreshToken
          );

          return {
            ...currentAuthState,
            appId,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          };
        }
        const hasAuthError =
          responseRefreshAccessMutation?.error?.graphQLErrors.some((e) =>
            isAuthError((e.extensions?.code as string) || "")
          );
        if (hasAuthError) {
          removeAccessToken();
          removeRefreshToken();

          config?.onLogout?.();
        }

        if (appId) {
          return {
            ...(authState as any),
            appId,
          };
        }
        return null;
      },
    }),
    fetchExchange,
  ];

  return {
    ssrCache,
    accessToken: config?.getAccessToken(),
    refreshToken: config?.getRefreshToken(),
    appId: config?.appId,
    api: createClient({
      url: config.url,
      exchanges,
      fetchOptions: () => {
        const accessToken = config?.getAccessToken();
        const refreshToken = config?.getRefreshToken();
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
