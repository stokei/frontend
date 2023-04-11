import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DOMAIN } from "./environments";
import {
  withCustomDomain,
  withLocalDomain,
  withSubDomain,
} from "./services/middlewares";
import { STOKEI_APP_NOT_FOUND_URL } from "./constants/stokei-urls";
import { URL } from "url";
import { NextURL } from "next/dist/server/web/next-url";
import { StokeiAPIConfig, createAPIClient } from "./services/graphql/client";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "./services/graphql/queries/current-app/current-app.query.graphql.generated";
import {
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "@stokei/graphql";
import {
  CurrentAccountQuery,
  CurrentAccountDocument,
} from "./services/graphql/queries/current-account/current-account.query.graphql.generated";
import { routes } from "./routes";
import { RoleName } from "./constants/role-names";
import { Client } from "urql";

const getDomain = ({
  domain,
  request,
}: {
  request: NextRequest;
  domain: string;
}) => {
  if (domain === "localhost" || !!domain?.match("vercel.app")) {
    return withLocalDomain({
      domain,
      nextUrl: request.nextUrl,
    });
  } else if (!!domain?.match(DOMAIN)) {
    return withSubDomain({
      domain,
      nextUrl: request.nextUrl,
    });
  }
  return withCustomDomain({
    domain,
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

  const { appId, isRedirect, url } = await getDomain({ domain, request });
  if (!appId) {
    return NextResponse.redirect(new URL(STOKEI_APP_NOT_FOUND_URL));
  }

  const cookies = {
    [ACCESS_TOKEN_HEADER_NAME]: request.cookies.get(ACCESS_TOKEN_HEADER_NAME)
      ?.value,
    [REFRESH_TOKEN_HEADER_NAME]: request.cookies.get(REFRESH_TOKEN_HEADER_NAME)
      ?.value,
  };

  try {
    const stokeiClient = createAPIClient({
      appId,
      cookies,
    });
    const currentAppResponse = await stokeiClient.api
      .query<CurrentGlobalAppQuery>(CurrentGlobalAppDocument, {})
      .toPromise();
    const currentAccountResponse = await stokeiClient.api
      .query<CurrentAccountQuery>(CurrentAccountDocument, {})
      .toPromise();

    const currentApp = currentAppResponse?.data?.currentApp;
    const currentAccount = currentAccountResponse?.data?.me;
    const isAuth = !!currentAccount;
    const baseURL = url.origin.replace(url.hostname, domain);
    const authURL = baseURL + routes.auth.login;
    const customersDashboardURL = baseURL + routes.customers.home;
    if (!!currentApp) {
      const privateRoutesRegex = /\/app\/.*\/(admins|customers)/;
      const adminDashboardRegex = /\/app\/.*\/admins/;
      const isPrivateRoute = !!url.pathname?.match(privateRoutesRegex);
      const isAdminDashboard = url.pathname?.match(adminDashboardRegex);
      if (isPrivateRoute) {
        if (!isAuth) {
          return NextResponse.redirect(authURL);
        }
        const isAppOwner = currentAccount?.isOwner;
        const isAppAdmin = currentAccount?.roles?.items?.some(
          (role) => role.name === RoleName.ADMIN
        );
        if (!isAppOwner && !isAppAdmin && isAdminDashboard) {
          return NextResponse.redirect(customersDashboardURL);
        }
      }
    }
  } catch (e) {}

  if (isRedirect) {
    return NextResponse.redirect(url);
  }
  return NextResponse.rewrite(url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
