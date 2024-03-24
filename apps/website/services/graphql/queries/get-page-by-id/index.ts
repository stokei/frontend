import { createAPIClient } from "../../client";
import {
  GetPageByIdDocument,
  GetPageByIdQuery,
} from "./page.query.graphql.generated";

export const getPageById = async ({
  cookies,
  pageId,
}: {
  pageId: string;
  cookies?: any;
}) => {
  const stokeiGraphQLClient = createAPIClient({
    cookies,
  });
  const page = await stokeiGraphQLClient.api
    .query<GetPageByIdQuery>(
      GetPageByIdDocument,
      {
        id: pageId,
      },
      { requestPolicy: "cache-and-network" }
    )
    .toPromise();
  return page?.data?.page;
};
