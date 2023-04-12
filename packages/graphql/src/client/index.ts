import { authExchange } from "@urql/exchange-auth";
import jwtDecode from "jwt-decode";
import {
  Exchange,
  cacheExchange,
  createClient,
  fetchExchange,
  ssrExchange,
} from "urql";
import {
  ACCESS_TOKEN_HEADER_NAME,
  APP_ID_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "../constants/tokens";
import {
  RefreshAccessMutationSchemaResponse,
  refreshAccessMutationSchema,
} from "../schemas";
import {
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

const tokenIsExpired = (token: string) => {
  const currentToken = token?.split("Bearer ")?.pop();
  const tokenDecoded = jwtDecode<{ exp: number }>(currentToken || "");
  const now = new Date(Date.now()).getTime();
  const isExpired = tokenDecoded?.exp * 1000 <= now;
  return isExpired;
};

export const createGraphqlClient = (config: ClientConfig) => {
  const ssrCache = ssrExchange({ isClient: !config.isServerSide });
  const appId = config?.appId;

  const exchanges = [
    // ssrCache,
    // cacheExchange,
    !!appId &&
      authExchange(async (utils) => {
        const accessToken = config?.getAccessToken();
        const refreshToken = config?.getRefreshToken();

        return {
          willAuthError(operation) {
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
          didAuthError(error, operation) {
            return error?.graphQLErrors?.some((e) =>
              isAuthError((e.extensions?.code as string) || "")
            );
          },
          addAuthToOperation(operation) {
            if (!!accessToken && !!refreshToken) {
              return utils.appendHeaders(operation, {
                [ACCESS_TOKEN_HEADER_NAME]: accessToken,
                [REFRESH_TOKEN_HEADER_NAME]: refreshToken,
                [APP_ID_HEADER_NAME]: appId || "",
              });
            }
            return utils.appendHeaders(operation, {
              [APP_ID_HEADER_NAME]: appId || "",
            });
          },
          async refreshAuth() {
            const responseRefreshAccessMutation =
              await utils.mutate<RefreshAccessMutationSchemaResponse>(
                refreshAccessMutationSchema,
                {}
              );

            if (responseRefreshAccessMutation.data?.response) {
              const refreshAccessData =
                responseRefreshAccessMutation.data.response;
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
              config?.onLogout?.();
            }
          },
        };
      }),
    fetchExchange,
  ].filter(Boolean) as Exchange[];

  return {
    ssrCache,
    accessToken: config?.getAccessToken(),
    refreshToken: config?.getRefreshToken(),
    appId: config?.appId,
    api: createClient({
      url: config.url,
      exchanges,
    }),
  };
};
