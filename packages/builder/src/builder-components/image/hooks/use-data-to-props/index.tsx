interface Data {
  image?: string;
  alt?: string;
}

export const useDataToProps = ({ data, props }: { data: Data; props: any }) => {
  const src = data?.image;
  return {
    src,
    id: props?.id,
    alt: data?.alt || "Image",
  };
};
