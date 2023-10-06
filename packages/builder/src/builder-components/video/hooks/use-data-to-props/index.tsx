interface Data {
  video?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const src = data?.video || "";
  return {
    id: props?.id,
    src,
  };
};
