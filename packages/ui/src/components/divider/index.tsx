import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from "@chakra-ui/react";

export interface DividerProps extends ChakraDividerProps {}
export const Divider: React.FC<DividerProps> = ({ children, ...props }) => (
  <ChakraDivider {...props}>{children}</ChakraDivider>
);
