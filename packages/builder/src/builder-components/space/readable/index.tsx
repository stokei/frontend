import { Spacer } from "@stokei/ui";

import { BaseComponentReadable } from "../../../types/base-component-readable";

interface ReadableProps {}

export const Readable = (props: BaseComponentReadable<ReadableProps>) => {
  return <Spacer {...props} />;
};
