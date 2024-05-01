import defaultImage from "../../../../assets/no-image.png";
import { useMemo } from "react";
import { useGetBuilderComponentImageQuery } from "../../graphql/image.query.graphql.generated";

export interface ImageData {
  image?: string;
  alt?: string;
}

export const useDataToProps = ({ data, props }: { data: ImageData; props: any }) => {
  const [{ data: dataGetImage, fetching: isLoading }] =
    useGetBuilderComponentImageQuery({
      pause: !data?.image,
      variables: {
        id: data?.image || "",
      },
    });

  const image = useMemo(() => dataGetImage?.image, [dataGetImage?.image]);

  const src = image?.file?.url || defaultImage?.src;
  return {
    src,
    isLoading,
    id: props?.id,
    alt: data?.alt || "Image",
  };
};
