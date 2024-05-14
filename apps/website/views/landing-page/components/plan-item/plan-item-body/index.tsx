import {
  CardBody
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export const PlanItemBody = ({ children }: PropsWithChildren) => {
  return (
    <CardBody paddingTop={0}>
      {children}
    </CardBody>
  );
};
