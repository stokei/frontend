import { createAPIClient } from "../../client";
import {
  CurrentGlobalAppDocument,
  CurrentGlobalAppQuery,
} from "../current-app/current-app.query.graphql.generated";

export const getAppBySlug = async ({
  cookies,
  slug,
}: {
  slug: string;
  cookies?: any;
}) => {
  const stokeiGetAppGraphQLClient = createAPIClient({
    cookies,
  });
  const currentApp = await stokeiGetAppGraphQLClient.api
    .query<CurrentGlobalAppQuery>(
      CurrentGlobalAppDocument,
      {
        slug,
      },
      { requestPolicy: "cache-and-network" }
    )
    .toPromise();
  return currentApp?.data?.currentApp;
};
