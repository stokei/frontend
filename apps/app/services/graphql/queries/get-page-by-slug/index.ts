import { createAPIClient } from "../../client";
import {
  GetPageBySlugDocument,
  GetPageBySlugQuery,
} from "./page.query.graphql.generated";

export const getPageBySlug = async ({
  cookies,
  slug,
  site,
}: {
  slug: string;
  site: string;
  cookies?: any;
}) => {
  const stokeiGraphQLClient = createAPIClient({
    cookies,
  });
  const page = await stokeiGraphQLClient.api
    .query<GetPageBySlugQuery>(
      GetPageBySlugDocument,
      {
        slug,
        site,
      },
      { requestPolicy: "cache-and-network" }
    )
    .toPromise();
  return page?.data?.page;
};
