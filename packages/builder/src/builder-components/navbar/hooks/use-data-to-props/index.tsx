interface Data {
  text?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  return {
    children: data?.text || "Button",
  };
};
