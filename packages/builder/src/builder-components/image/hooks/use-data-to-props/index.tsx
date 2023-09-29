interface Data {
  image?: string;
  alt?: string;
}

export const useDataToProps = ({ data }: { data: Data }) => {
  const src = data?.image;
  return {
    src,
    alt: data?.alt || "Image",
  };
};
