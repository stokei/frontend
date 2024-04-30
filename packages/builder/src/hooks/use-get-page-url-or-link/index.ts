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

  const onGoToPageURLOrLink = useCallback(() => {
    let url = link;
    if (!url && page?.url) {
      url = page?.url;
    } else {
      url = routes.customPage({
        page: page?.id || "",
        slug: page?.slug || "",
      });
    }

    return window.open(url, "_blank");
  }, [link, page, routes]);

  return {
    page,
    isLoading,
    onGoToPageURLOrLink,
  };
};
