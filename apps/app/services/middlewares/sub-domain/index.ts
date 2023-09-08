import { DOMAIN } from "@/environments";
import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { gql } from "urql";

const currentAppQuery = gql`
  query CurrentAppSubDomain($slug: String!) {
    currentApp: app(slug: $slug) {
      id
      name
    }
  }
`;

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
    app = await stokeiClient.api
      .query(currentAppQuery, {
        slug,
      })
      .toPromise();
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
