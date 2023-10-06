import { GridItem } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentReadable } from "../../../types/base-component-readable";
import { useDataToProps } from "../hooks/use-data-to-props";

interface ReadableProps {}

export const Readable: FC<BaseComponentReadable<ReadableProps>> = ({
  data,
  ...props
}) => {
  const dataProps = useDataToProps({ data, props });
  return <GridItem {...dataProps} />;
};
