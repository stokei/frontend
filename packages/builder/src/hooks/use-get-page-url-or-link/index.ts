import { useCallback, useMemo } from "react";
import { useGetPageQuery } from "../../graphql/page.query.graphql.generated";
import { useBuilder } from "../use-builder";

export interface UseGetPageURLOrLink {
  pageId?: string;
  link?: string;
}

export const useGetPage = ({ link, pageId }: UseGetPageURLOrLink) => {
  const { getCustomPageURL } = useBuilder();
  const [{ fetching: isLoading, data: dataGetPage }] = useGetPageQuery({
    pause: !pageId,
    variables: {
      page: pageId || "",
    },
  });

  const page = useMemo(() => dataGetPage?.page, [dataGetPage?.page]);

  const onGoToPageURLOrLink = useCallback(
    () =>
      window.location.assign(
        link ||
          getCustomPageURL({
            pageId: pageId || "",
            slug: page?.slug || "",
          })
      ),
    [getCustomPageURL, link, page?.slug, pageId]
  );

  return {
    page,
    isLoading,
    onGoToPageURLOrLink,
  };
};
