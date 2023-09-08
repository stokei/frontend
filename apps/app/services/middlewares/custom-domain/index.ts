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
        slug
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
  let slug;
  let app: any;
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
    app = currentDomain?.data?.domain?.app;
    slug = app?.slug;
    if (!!slug) {
      if (pathname.startsWith("/app/" + slug)) {
        url.href = url.href
          .replace("/app/" + slug, "/")
          .replace(url.hostname, domain);
        isRedirect = true;
      } else {
        url.pathname = url.pathname.replace("/", "/app/" + slug + "/");
      }
    }
  } catch (error) {
    slug = "";
  }

  return {
    appId: app?.id,
    slug,
    isRedirect,
    url,
  };
};
