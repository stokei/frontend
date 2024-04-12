export interface TextData {
  highlight?: string;
  value?: string;
}

export const useDataToProps = ({
  data,
  props,
}: {
  data: TextData;
  props: any;
}) => {
  return {
    children: data?.value || "",
    highlight: data?.highlight,
  };
};
