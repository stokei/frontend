import {
  List
} from "@stokei/ui";
import { PropsWithChildren } from "react";

export const PlanItemFeatures = ({ children }: PropsWithChildren) => {
  return (
    <List>
      {children}
    </List>
  );
};
