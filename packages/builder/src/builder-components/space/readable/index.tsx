import { Spacer } from "@stokei/ui";

import { BaseComponentReadable } from "../../../types/base-component-readable";

interface ReadableProps {}

export const Readable: FC<BaseComponentReadable<ReadableProps>> = ({
  ...props
}) => {
  return <Spacer {...props} />;
};
