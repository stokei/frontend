import { Card, CardBody } from "@stokei/ui";
import { FC, PropsWithChildren } from "react";

interface SectionContentProps {}

export const SectionContent: FC<PropsWithChildren<SectionContentProps>> = ({
  children,
}) => {
  return (
    <Card width="auto" flex="1" background="background.50">
      <CardBody>{children}</CardBody>
    </Card>
  );
};
