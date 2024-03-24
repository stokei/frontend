import { Card, CardBody } from "@stokei/ui";
import { PropsWithChildren } from "react";

interface SectionContentProps {}

export const SectionContent = ({
  children,
}: PropsWithChildren<SectionContentProps>) => {
  return (
    <Card width="auto" flex="1" background="background.50">
      <CardBody>{children}</CardBody>
    </Card>
  );
};
