interface Data {
  video?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const src = data?.video || "";
  const filename = data?.video || "";
  return {
    id: props?.id,
    src,
    filename,
  };
};
