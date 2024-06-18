import { PropsWithChildren } from "react";

import { Hr as ReactEmailHr } from "@react-email/components";
import { dividerStyle } from "./styles";

interface DividerProps {}

export const Divider = ({ children }: PropsWithChildren<DividerProps>) => {
  return <ReactEmailHr style={dividerStyle}>{children}</ReactEmailHr>;
};
