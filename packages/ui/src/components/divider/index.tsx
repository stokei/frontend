import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from "@chakra-ui/react";

export interface DividerProps extends ChakraDividerProps {}
export const Divider = ({ children, ...props }: DividerProps) => (
  <ChakraDivider {...props}>{children}</ChakraDivider>
);
