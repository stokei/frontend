import { CardHeader } from "@stokei/ui";

import { BaseComponentReadable } from "../../../types/base-component-readable";

interface ReadableProps {}

export const Readable = ({
  data,
  children,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  return <CardHeader {...props}>{children}</CardHeader>;
};
