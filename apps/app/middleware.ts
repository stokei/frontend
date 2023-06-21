import {
  ACCESS_TOKEN_HEADER_NAME,
  APP_ID_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "@stokei/graphql";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { URL } from "url";
import { RoleName } from "./constants/role-names";
import { STOKEI_APP_NOT_FOUND_URL } from "./constants/stokei-urls";
import { DOMAIN } from "./environments";
import { routes } from "./routes";
import { createAPIClient } from "./services/graphql/client";
import {
  CurrentAccountDocument,
  CurrentAccountQuery,
} from "./services/graphql/queries/current-account/current-account.query.graphql.generated";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "./services/graphql/queries/current-app/current-app.query.graphql.generated";
import {
  withCustomDomain,
  withLocalDomain,
  withSubDomain,
} from "./services/middlewares";
import { BASE_URL_HEADER_NAME } from "./constants/base-url-header-name";

const getDomain = ({
  domain,
  cookies,
  request,
}: {
  request: NextRequest;
  domain: string;
  cookies?: Record<string, string>;
}) => {
  if (domain === "localhost" || !!domain?.match("vercel.app")) {
    return withLocalDomain({
      domain,
      cookies,
      nextUrl: request.nextUrl,
    });
  } else if (!!domain?.match(DOMAIN)) {
    return withSubDomain({
      domain,
      cookies,
      nextUrl: request.nextUrl,
    });
  }
  return withCustomDomain({
    domain,
    cookies,
    nextUrl: request.nextUrl,
  });
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [domain] = request.headers.get("host")?.split(":") || [];
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  const cookies: Record<string, string> = {
    [APP_ID_HEADER_NAME]: request.cookies.get(APP_ID_HEADER_NAME)?.value || "",
    [ACCESS_TOKEN_HEADER_NAME]:
      request.cookies.get(ACCESS_TOKEN_HEADER_NAME)?.value || "",
    [REFRESH_TOKEN_HEADER_NAME]:
      request.cookies.get(REFRESH_TOKEN_HEADER_NAME)?.value || "",
  };

  const { appId, isRedirect, url } = await getDomain({
    domain,
    request,
    cookies,
  });
  if (!appId) {
    return NextResponse.redirect(STOKEI_APP_NOT_FOUND_URL);
  }
  let baseURL = url.origin.replace(url.hostname, domain);
  if (!!domain?.match("localhost") || !!domain?.match("vercel.app")) {
    baseURL = `${baseURL}/app/${appId}`;
  }
  try {
    const stokeiClient = createAPIClient({
      appId,
      cookies,
    });
    const currentAppResponse = await stokeiClient.api
      .query<CurrentGlobalAppQuery>(
        CurrentGlobalAppDocument,
        {},
        { requestPolicy: "network-only" }
      )
      .toPromise();
    const currentAccountResponse = await stokeiClient.api
      .query<CurrentAccountQuery>(
        CurrentAccountDocument,
        {},
        { requestPolicy: "network-only" }
      )
      .toPromise();

    const currentApp = currentAppResponse?.data?.currentApp;
    const currentAccount = currentAccountResponse?.data?.me;
    const isAuth = !!currentAccount;
    const authURL = baseURL + routes.auth.login;
    const customersDashboardURL = baseURL + routes.customers.home;
    if (!!currentApp) {
      const privateRoutesRegex = /\/app\/.*\/(admins|customers)/;
      const adminDashboardRegex = /\/app\/.*\/admins/;
      const isPrivateRoute = !!url.pathname?.match(privateRoutesRegex);
      const isAdminDashboard = url.pathname?.match(adminDashboardRegex);
      if (isPrivateRoute) {
        if (!isAuth) {
          const response = NextResponse.redirect(authURL);
          response.cookies.set(APP_ID_HEADER_NAME, appId);
          return response;
        }
        if (isAuth) {
          const isAppOwner = currentAccount?.isOwner;
          const isAppAdmin = currentAccount?.roles?.items?.some(
            (role) => role.name === RoleName.ADMIN
          );
          if (!isAppOwner && !isAppAdmin && isAdminDashboard) {
            return NextResponse.redirect(customersDashboardURL);
          }
        }
      }
    }
  } catch (e) {}

  if (isRedirect) {
    const response = NextResponse.redirect(url);
    response.cookies.set(APP_ID_HEADER_NAME, appId);
    response.headers.append(BASE_URL_HEADER_NAME, baseURL);
    return response;
  }
  const response = NextResponse.rewrite(url);
  response.cookies.set(APP_ID_HEADER_NAME, appId);
  response.headers.append(BASE_URL_HEADER_NAME, baseURL);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
