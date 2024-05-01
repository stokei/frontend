interface Data {
  catalog?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  return {
    catalog: data?.catalog,
  };
};
