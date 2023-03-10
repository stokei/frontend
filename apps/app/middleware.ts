import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DOMAIN } from "./environments";
import {
  withCustomDomain,
  withLocalDomain,
  withSubDomain,
} from "./services/middlewares";

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
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
