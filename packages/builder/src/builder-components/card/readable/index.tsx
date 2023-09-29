import { Card, CardBody } from "@stokei/ui";
import { FC } from "react";
import { BaseComponentReadable } from "../../../types/base-component-readable";

interface ReadableProps {}

export const Readable: FC<BaseComponentReadable<ReadableProps>> = ({
  data,
  children,
  ...props
}) => {
  return (
    <Card {...props}>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
