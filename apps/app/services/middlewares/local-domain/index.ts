import { APP_ID_HEADER_NAME } from "@stokei/graphql";
import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { gql } from "urql";
import { APP_SLUG_COOKIE_KEY } from "@/constants/cookies-keys";
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
  const hasRouteApp = pathnameListParams[1] === "app";
  let slug = pathnameListParams[2];
  let app: any;

  try {
    if (!hasRouteApp && cookies?.[APP_SLUG_COOKIE_KEY]) {
      slug = cookies?.[APP_SLUG_COOKIE_KEY];
    }
    if (!!slug) {
      const stokeiClient = createAPIClient({ cookies });
      const currentSiteResponse = await stokeiClient.api
        .query(CurrentGlobalAppDocument, {
          slug,
        })
        .toPromise();
      slug = currentSiteResponse?.data?.site?.slug;
      app = currentSiteResponse?.data?.site?.app;

      if (!!app) {
        if (!url.pathname.startsWith("/app/" + slug)) {
          url.pathname = url.pathname.replace("/", "/app/" + slug + "/");
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
    appId: app?.id,
    isRedirect,
    url,
  };
};
