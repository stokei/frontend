import {
  StatLabel as ChakraStatLabel,
  StatLabelProps as ChakraStatLabelProps,
} from "@chakra-ui/react";

export interface StatLabelProps extends ChakraStatLabelProps {}
export const StatLabel: React.FC<StatLabelProps> = ({ children, ...props }) => (
  <ChakraStatLabel {...props}>{children}</ChakraStatLabel>
);
