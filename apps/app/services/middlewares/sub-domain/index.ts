import { DOMAIN } from "@/environments";
import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { CurrentGlobalAppDocument } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";

export const withSubDomain = async ({
  cookies,
  nextUrl,
  domain,
}: WithDomainProps): Promise<MiddlewareResponse> => {
  const url = nextUrl.clone();

  let slug = domain?.split(`.${DOMAIN}`)[0];
  let isRedirect = false;
  let app: any;
  try {
    const stokeiClient = createAPIClient({ cookies });
    const currentSiteResponse = await stokeiClient.api
      .query(CurrentGlobalAppDocument, {
        slug,
      })
      .toPromise();
    slug = currentSiteResponse?.data?.site?.slug;
    app = currentSiteResponse?.data?.site?.app;

    if (url.pathname.startsWith("/app/" + slug)) {
      url.href = url.href
        .replace("/app/" + slug, "/")
        .replace(url.hostname, domain);
      isRedirect = true;
    } else {
      url.pathname = url.pathname.replace("/", "/app/" + slug + "/");
    }
  } catch (error) {
    slug = "";
  }

  return {
    slug,
    appId: app?.id,
    isRedirect,
    url,
  };
};
