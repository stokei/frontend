import {
  StatLabel as ChakraStatLabel,
  StatLabelProps as ChakraStatLabelProps,
} from "@chakra-ui/react";

export interface StatLabelProps extends ChakraStatLabelProps {}
export const StatLabel = ({ children, ...props }: StatLabelProps) => (
  <ChakraStatLabel {...props}>{children}</ChakraStatLabel>
);
