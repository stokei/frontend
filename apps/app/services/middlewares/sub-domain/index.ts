import { DOMAIN } from "@/environments";
import {
  MiddlewareAppResponse,
  MiddlewareResponse,
  MiddlewareSiteResponse,
} from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";

export const withSubDomain = async ({
  cookies,
  nextUrl,
  domain,
}: WithDomainProps): Promise<MiddlewareResponse> => {
  const url = nextUrl.clone();

  let slug = domain?.split(`.${DOMAIN}`)[0];
  let isRedirect = false;
  let app: MiddlewareAppResponse | undefined;
  let site: MiddlewareSiteResponse | undefined;
  try {
    const stokeiClient = createAPIClient({ cookies });
    const currentSiteResponse = await stokeiClient.api
      .query<CurrentGlobalAppQuery>(CurrentGlobalAppDocument, {
        slug,
      })
      .toPromise();
    site = currentSiteResponse?.data?.site;
    slug = site?.slug || "";
    app = site?.app;

    if (url.pathname.startsWith("/site/" + slug)) {
      url.href = url.href
        .replace("/site/" + slug, "/")
        .replace(url.hostname, domain);
      isRedirect = true;
    } else {
      url.pathname = url.pathname.replace("/", "/site/" + slug + "/");
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
