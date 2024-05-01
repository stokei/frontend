import {
  MiddlewareAppResponse,
  MiddlewareResponse,
  MiddlewareSiteResponse,
} from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { CurrentGlobalAppDocument } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { gql } from "urql";

const currentAppDomainQuery = gql`
  query CurrentAppCustomDomain($domain: String!) {
    domain(name: $domain) {
      id
      name
      parent
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
  let app: MiddlewareAppResponse | undefined;
  let site: MiddlewareSiteResponse | undefined;
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
    const domainModel = currentDomain?.data?.domain;

    const currentSiteResponse = await stokeiClient.api
      .query(CurrentGlobalAppDocument, {
        site: domainModel?.parent,
      })
      .toPromise();
    site = currentSiteResponse?.data?.site;
    slug = site?.slug || "";
    app = site?.app;

    if (!!slug) {
      if (pathname.startsWith("/site/" + slug)) {
        url.href = url.href
          .replace("/site/" + slug, "/")
          .replace(url.hostname, domain);
        isRedirect = true;
      } else {
        url.pathname = url.pathname.replace("/", "/site/" + slug + "/");
      }
    }
  } catch (error) {
    slug = "";
  }

  return {
    site,
    app,
    slug,
    isRedirect,
    url,
  };
};
