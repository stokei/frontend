export interface TextData {
  highlight?: string;
  value?: string;
  color?: string;
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
    color: data?.color || "",
    highlight: data?.highlight,
  };
};
