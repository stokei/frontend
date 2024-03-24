interface Data {}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  return {
    width: ["full", "full", "40%", "40%"],
    children: props?.children,
  };
};
