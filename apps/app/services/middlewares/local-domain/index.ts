import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
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
  cookies,
  nextUrl,
  domain,
}: WithDomainProps): Promise<MiddlewareResponse> => {
  const url = nextUrl.clone();
  const { pathname } = nextUrl;
  let isRedirect = false;
  let appId = pathname.split("/")[2];

  try {
    if (!!appId) {
      const stokeiClient = createAPIClient({ appId, cookies });
      await stokeiClient.api
        .query(currentAppQuery, {
          domain,
        })
        .toPromise();
    }
  } catch (error) {
    appId = "";
  }
  return {
    appId,
    isRedirect,
    url,
  };
};
