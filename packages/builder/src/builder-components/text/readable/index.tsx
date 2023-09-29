import { Text } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentReadable } from "../../../types/base-component-readable";

interface ReadableProps {}

export const Readable: FC<BaseComponentReadable<ReadableProps>> = (props) => {
  return <Text {...props} />;
};
