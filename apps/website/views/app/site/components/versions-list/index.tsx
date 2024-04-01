import { useSite } from "@/hooks";
import { useMemo } from "react";
import { useGetSitePagesQuery } from "../../../../graphql/pages.query.graphql.generated";
import { PageItem } from "../../../../components/page-item";

export const PagesList = () => {
  const { siteId } = useSite();
  const [{ data: dataGetPages }] = useGetSitePagesQuery({
    pause: !siteId,
    variables: {
      where: {
        AND: {
          parent: {
            equals: siteId,
          },
        },
      },
    },
  });
  const pages = useMemo(
    () => dataGetPages?.pages?.items || [],
    [dataGetPages?.pages?.items]
  );
  return <>{pages?.map((page) => <PageItem key={page?.id} page={page} />)}</>;
};
