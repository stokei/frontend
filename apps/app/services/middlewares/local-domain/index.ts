import { APP_ID_HEADER_NAME } from "@stokei/graphql";
import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { gql } from "urql";

const currentAppQuery = gql`
  query CurrentAppLocalDomain($slug: String!) {
    currentApp: app(slug: $slug) {
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
  let app: any;

  try {
    if (!appId?.startsWith("app_")) {
      if (cookies?.[APP_ID_HEADER_NAME]?.startsWith("app_")) {
        appId = cookies?.[APP_ID_HEADER_NAME];
      } else {
        appId = "";
      }
    }
    if (!!appId) {
      const stokeiClient = createAPIClient({ appId, cookies });
      const currentAppResponse = await stokeiClient.api
        .query<{ currentApp: any }>(currentAppQuery, {
          slug: appId,
        })
        .toPromise();
      if (!!currentAppResponse?.data?.currentApp) {
        app = currentAppResponse?.data?.currentApp;
        if (!url.pathname.startsWith("/app/" + appId)) {
          url.pathname = url.pathname.replace("/", "/app/" + appId + "/");
          isRedirect = true;
        }
      } else {
        appId = "";
      }
    }
  } catch (error) {
    appId = "";
  }
  return {
    appId: app?.id,
    isRedirect,
    url,
  };
};
