import { Card, CardBody } from "@stokei/ui";

import { BaseComponentReadable } from "../../../types/base-component-readable";

interface ReadableProps {}

export const Readable = ({
  data,
  children,
  ...props
}: BaseComponentReadable<ReadableProps>) => {
  return (
    <Card {...props}>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
