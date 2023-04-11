import { authExchange } from "@urql/exchange-auth";
import jwtDecode from "jwt-decode";
import { cacheExchange, createClient, fetchExchange, ssrExchange } from "urql";
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

  const exchanges = [
    // ssrCache,
    cacheExchange,
    authExchange(async (utils) => {
      const appId = config?.appId;
      const accessToken = config?.getAccessToken();
      const refreshToken = config?.getRefreshToken();

      return {
        willAuthError(operation) {
          const accessTokenIsExpired = !!accessToken
            ? tokenIsExpired(accessToken)
            : false;
          const refreshTokenIsExpired = !!refreshToken
            ? tokenIsExpired(refreshToken)
            : false;

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

          if (accessTokenIsExpired || refreshTokenIsExpired) {
            return true;
          }
          return isAllowedToRefreshAccess;
        },
        didAuthError(error, operation) {
          return error?.graphQLErrors?.some((e) =>
            isAuthError((e.extensions?.code as string) || "")
          );
        },
        addAuthToOperation(operation) {
          // NÃO ESTA MANDANDO OS TOKENS
          // VERIFICAR SE EXISTE NOS COOKIES
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
              // {
              //   fetchOptions: {
              //     headers: {
              //       [ACCESS_TOKEN_HEADER_NAME]: accessToken || "",
              //       [REFRESH_TOKEN_HEADER_NAME]: refreshToken || "",
              //       [APP_ID_HEADER_NAME]: appId || "",
              //     },
              //   },
              // }
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
          console.log({
            message:
              responseRefreshAccessMutation?.operation?.context?.fetchOptions,
          });
          const hasAuthError =
            responseRefreshAccessMutation?.error?.graphQLErrors.some((e) =>
              isAuthError((e.extensions?.code as string) || "")
            );
          if (hasAuthError) {
            // removeAccessToken();
            // removeRefreshToken();
            // config?.onLogout?.();
          }
        },
      };
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
