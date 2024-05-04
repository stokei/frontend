import {
  Card
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export const PlanItem = ({ children }: PropsWithChildren) => {
  return (
    <Card background="background.50" justify="space-between">
      {children}
    </Card>
  );
};
