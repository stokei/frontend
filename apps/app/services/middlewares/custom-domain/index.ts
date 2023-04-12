import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { gql } from "urql";

const currentAppDomainQuery = gql`
  query CurrentAppCustomDomain($domain: String!) {
    domain(name: $domain) {
      id
      name
      parent
      app {
        id
        name
      }
    }
  }
`;

export const withCustomDomain = async ({
  cookies,
  nextUrl,
  domain,
}: WithDomainProps): Promise<MiddlewareResponse> => {
  const url = nextUrl.clone();
  const { pathname } = nextUrl;
  let appId;
  let isRedirect = false;
  try {
    const stokeiClient = createAPIClient({
      cookies,
    });
    const currentDomain = await stokeiClient.api
      .query(currentAppDomainQuery, {
        domain,
      })
      .toPromise();
    appId = currentDomain?.data?.domain?.parent;
    if (!!appId) {
      if (pathname.startsWith("/app/" + appId)) {
        url.href = url.href
          .replace("/app/" + appId, "/")
          .replace(url.hostname, domain);
        isRedirect = true;
      } else {
        url.pathname = url.pathname.replace("/", "/app/" + appId + "/");
      }
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
