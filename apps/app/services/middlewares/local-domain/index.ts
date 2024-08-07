import { SITE_SLUG_COOKIE_KEY } from "@/constants/cookies-keys";
import {
  MiddlewareAppResponse,
  MiddlewareResponse,
  MiddlewareSiteResponse,
} from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { CurrentGlobalAppDocument } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";

export const withLocalDomain = async ({
  cookies,
  nextUrl,
  domain,
}: WithDomainProps): Promise<MiddlewareResponse> => {
  const url = nextUrl.clone();
  const { pathname } = nextUrl;
  let isRedirect = false;
  const pathnameListParams = pathname.split("/");
  const hasRouteSite = pathnameListParams[1] === "site";
  let slug = pathnameListParams[2];
  let app: MiddlewareAppResponse | undefined;
  let site: MiddlewareSiteResponse | undefined;

  try {
    if (!hasRouteSite && cookies?.[SITE_SLUG_COOKIE_KEY]) {
      slug = cookies?.[SITE_SLUG_COOKIE_KEY];
    }
    if (!!slug) {
      const stokeiClient = createAPIClient({ cookies });
      const currentSiteResponse = await stokeiClient.api
        .query(
          CurrentGlobalAppDocument,
          {
            slug,
          },
          {
            requestPolicy: "network-only",
          }
        )
        .toPromise();
      site = currentSiteResponse?.data?.site;
      slug = site?.slug || "";
      app = site?.app;

      if (!!app) {
        if (!url.pathname.startsWith("/site/" + slug)) {
          url.pathname = url.pathname.replace("/", "/site/" + slug + "/");
          isRedirect = true;
        }
      } else {
        slug = "";
      }
    }
  } catch (error) {
    slug = "";
  }
  return {
    slug,
    site,
    app,
    isRedirect,
    url,
  };
};
