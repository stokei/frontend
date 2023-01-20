// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DOMAIN } from "./environments";
import { gql } from "urql";
import { createAPIClient } from "./services/graphql/client";

const currentAppQuery = gql`
  query CurrentDomain($domain: String!) {
    domains(where: { AND: { name: { equals: $domain } } }) {
      items {
        id
        name
        app {
          id
        }
      }
    }
  }
`;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  const domain = request.headers.get("host")?.split(":")[0];
  let appId: string = "";
  if (domain === DOMAIN || !!domain?.match("vercel.app")) {
    appId = "";
  } else {
    const stokeiClient = createAPIClient({});
    try {
      const currentDomain = await stokeiClient.api
        .query(currentAppQuery, {
          domain,
        })
        .toPromise();
      appId = currentDomain?.data?.domains?.items?.[0]?.app?.id;
    } catch (error) {}
  }

  url.pathname = url.pathname.replace("/", "/app/" + appId);
  console.log({ domain, params: request.nextUrl });

  return NextResponse.rewrite(url);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
