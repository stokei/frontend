import { Image, Skeleton } from "@stokei/ui";

import { BaseComponentReadable } from "../../../types/base-component-readable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps { }

export const Readable = ({
  data,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  const dataProps = useDataToProps({ data, props });
  if (dataProps?.isLoading) {
    return <Skeleton height="20" />;
  }
  return <Image {...dataProps} alt={dataProps.alt} />;
};
