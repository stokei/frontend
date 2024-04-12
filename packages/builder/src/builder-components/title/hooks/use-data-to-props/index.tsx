export interface TitleData {
  highlight?: string;
  value?: string;
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
    highlight: data?.highlight,
  };
};
