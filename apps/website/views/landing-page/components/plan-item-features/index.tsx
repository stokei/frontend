import {
  CardBody,
  List
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export const PlanItemFeatures = ({ children }: PropsWithChildren) => {
  return (
    <CardBody paddingTop={0}>
      <List>
        {children}
      </List>
    </CardBody>
  );
};
