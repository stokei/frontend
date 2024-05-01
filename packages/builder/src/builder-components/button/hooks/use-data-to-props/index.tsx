import { useGetPage } from "../../../../hooks/use-get-page-url-or-link";
import { BaseComponent } from "../../../../types/base-component";

export interface ButtonProps {
  isBlockEditable?: boolean;
}
export interface ButtonData {
  text?: string;
  pageId?: string;
  link?: string;
}

export const useDataToProps = ({ data, props }: { data: ButtonData; props: BaseComponent<ButtonProps> }) => {
  const { isLoading, onGoToPageURLOrLink } = useGetPage({
    link: data?.link,
    pageId: data?.pageId,
  });
  return {
    isLoading,
    onClick: !props?.isBlockEditable ? onGoToPageURLOrLink : undefined,
    children: data?.text || "Button",
  };
};
