export interface TitleData {
  highlight?: string;
  value?: string;
  color?: string;
}

export const useDataToProps = ({
  data,
  props,
}: {
  data: TitleData;
  props: any;
}) => {
  return {
    children: data?.value || "",
    color: data?.color,
    highlight: data?.highlight,
  };
};
