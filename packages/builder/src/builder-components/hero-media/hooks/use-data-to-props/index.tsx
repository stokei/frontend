interface Data { }

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  return {
    children: props?.children,
  };
};
