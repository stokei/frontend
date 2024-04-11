import { useCallback, useMemo } from "react";
import { useGetPageQuery } from "../../graphql/page.query.graphql.generated";
import { useBuilder } from "../use-builder";

export interface UseGetPageURLOrLink {
  pageId?: string;
  link?: string;
}

export const useGetPage = ({ link, pageId }: UseGetPageURLOrLink) => {
  const { routes } = useBuilder();
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
          routes.customPage({
            page: pageId || "",
            slug: page?.slug || "",
          })
      ),
    [routes, link, page?.slug, pageId]
  );

  return {
    page,
    isLoading,
    onGoToPageURLOrLink,
  };
};
