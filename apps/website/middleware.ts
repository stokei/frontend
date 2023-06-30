import {
  ACCESS_TOKEN_HEADER_NAME,
  APP_ID_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "@stokei/graphql";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
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

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();
  const [domain] = request.headers.get("host")?.split(":") || [];
  const baseURL = nextUrl?.origin?.replace(nextUrl?.hostname, domain);
  if (
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.startsWith("/favicon.ico") ||
    nextUrl.pathname.startsWith("/assets")
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
  try {
    const stokeiClient = createAPIClient({
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
    const authURL = routes.auth.login;
    if (!!currentApp) {
      const privateRoutesRegex = /\/(apps|app).*/;
      const isPrivateRoute = !!nextUrl.pathname?.match(privateRoutesRegex);
      if (isPrivateRoute) {
        if (!isAuth) {
          return NextResponse.redirect(baseURL + authURL);
        }
      }
    }
  } catch (e) {}
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
