import { STOKEI_APP_NOT_FOUND_URL } from "@/constants/stokei-urls";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { NextResponse } from "next/server";
import { gql } from "urql";

const currentAppQuery = gql`
  query CurrentAppLocalDomain($domain: String!) {
    currentApp {
      id
      name
    }
  }
`;

export const withLocalDomain = async ({
  nextUrl,
  domain,
}: WithDomainProps): Promise<NextResponse> => {
  const url = nextUrl.clone();
  const { pathname } = nextUrl;
  let appId = pathname.split("/")[2];
  if (!appId) {
    return NextResponse.redirect(new URL(STOKEI_APP_NOT_FOUND_URL));
  }

  try {
    const stokeiClient = createAPIClient({ appId });
    await stokeiClient.api
      .query(currentAppQuery, {
        domain,
      })
      .toPromise();
  } catch (error) {
    appId = "";
  }

  if (!appId) {
    return NextResponse.redirect(new URL(STOKEI_APP_NOT_FOUND_URL));
  }
  return NextResponse.rewrite(url);
};
