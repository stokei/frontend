import { STOKEI_APP_NOT_FOUND_URL } from "@/constants/stokei-urls";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { NextResponse } from "next/server";
import { gql } from "urql";

const currentAppDomainQuery = gql`
  query CurrentAppCustomDomain($domain: String!) {
    domain(name: $domain) {
      id
      name
      app {
        id
        name
      }
    }
  }
`;

export const withCustomDomain = async ({
  nextUrl,
  domain,
}: WithDomainProps): Promise<NextResponse> => {
  const url = nextUrl.clone();
  const { pathname } = nextUrl;
  let appId;
  try {
    const stokeiClient = createAPIClient();
    const currentDomain = await stokeiClient.api
      .query(currentAppDomainQuery, {
        domain,
      })
      .toPromise();
    appId = currentDomain?.data?.domain?.app?.id;
    if (!appId) {
      return NextResponse.redirect(new URL(STOKEI_APP_NOT_FOUND_URL));
    }
    if (pathname.startsWith("/app/" + appId)) {
      url.href = url.href
        .replace("/app/" + appId, "/")
        .replace(url.hostname, domain);
      return NextResponse.redirect(url.href);
    } else {
      url.pathname = url.pathname.replace("/", "/app/" + appId + "/");
    }
  } catch (error) {
    appId = "";
  }

  if (!appId) {
    return NextResponse.redirect(new URL(STOKEI_APP_NOT_FOUND_URL));
  }
  return NextResponse.rewrite(url);
};
