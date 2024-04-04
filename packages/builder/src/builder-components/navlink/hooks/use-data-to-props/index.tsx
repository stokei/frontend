import { useGetPage } from "../../../../hooks/use-get-page-url-or-link";

interface Data {
  text?: string;
  pageId?: string;
  link?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const { isLoading, onGoToPageURLOrLink } = useGetPage({
    link: data?.link,
    pageId: data?.pageId,
  });
  return {
    isLoading,
    onClick: onGoToPageURLOrLink,
    children: data?.text || "Link",
  };
};
