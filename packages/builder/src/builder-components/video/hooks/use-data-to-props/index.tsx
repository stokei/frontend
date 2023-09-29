interface Data {
  video?: string;
}

export const useDataToProps = ({ data }: { data: Data }) => {
  const src = data?.video || "";
  return {
    src,
  };
};
