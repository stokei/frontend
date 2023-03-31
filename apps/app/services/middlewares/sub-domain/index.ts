import { STOKEI_APP_NOT_FOUND_URL } from "@/constants/stokei-urls";
import { DOMAIN } from "@/environments";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { NextResponse } from "next/server";
import { gql } from "urql";

const currentAppQuery = gql`
  query CurrentAppSubDomain {
    currentApp {
      id
      name
    }
  }
`;

export const withSubDomain = async ({
  nextUrl,
  domain,
}: WithDomainProps): Promise<NextResponse> => {
  const url = nextUrl.clone();

  let appId = domain?.split(`.${DOMAIN}`)[0];
  if (!appId) {
    return NextResponse.redirect(new URL(STOKEI_APP_NOT_FOUND_URL));
  }

  try {
    const stokeiClient = createAPIClient({ appId });
    await stokeiClient.api.query(currentAppQuery, {}).toPromise();
    if (url.pathname.startsWith("/app/" + appId)) {
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
