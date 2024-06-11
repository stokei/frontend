import { PropsWithChildren } from "react";
import { spacerStyle } from "./styles";

interface SpacerProps {}

export const Spacer = ({ children }: PropsWithChildren<SpacerProps>) => {
  return <div style={spacerStyle}>{children}</div>;
};
