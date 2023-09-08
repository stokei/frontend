import { APP_ID_HEADER_NAME } from "@stokei/graphql";
import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { gql } from "urql";
import { APP_SLUG_COOKIE_KEY } from "@/constants/cookies-keys";

const currentAppQuery = gql`
  query CurrentAppLocalDomain($slug: String!) {
    currentApp: app(slug: $slug) {
      id
      slug
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
      const currentAppResponse = await stokeiClient.api
        .query<{ currentApp: any }>(currentAppQuery, {
          slug,
        })
        .toPromise();
      if (!!currentAppResponse?.data?.currentApp) {
        app = currentAppResponse?.data?.currentApp;
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
