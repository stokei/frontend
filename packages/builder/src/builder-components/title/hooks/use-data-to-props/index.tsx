interface Data {
  highlight?: string;
  value?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  return {
    children: data?.value || "",
    highlight: data?.highlight,
  };
};
