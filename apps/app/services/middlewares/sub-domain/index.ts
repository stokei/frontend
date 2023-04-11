import { DOMAIN } from "@/environments";
import { MiddlewareResponse } from "@/interfaces/middleware-response";
import { WithDomainProps } from "@/interfaces/with-domain-props";
import { createAPIClient } from "@/services/graphql/client";
import { gql } from "urql";

const currentAppQuery = gql`
  query CurrentAppSubDomain {
    currentApp {
      id
      name
    }
  }
`;

export const withSubDomain = async ({
  nextUrl,
  domain,
}: WithDomainProps): Promise<MiddlewareResponse> => {
  const url = nextUrl.clone();

  let appId = domain?.split(`.${DOMAIN}`)[0];
  let isRedirect = false;

  try {
    const stokeiClient = createAPIClient({ appId });
    await stokeiClient.api.query(currentAppQuery, {}).toPromise();
    if (url.pathname.startsWith("/app/" + appId)) {
      url.href = url.href
        .replace("/app/" + appId, "/")
        .replace(url.hostname, domain);
      isRedirect = true;
    } else {
      url.pathname = url.pathname.replace("/", "/app/" + appId + "/");
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
