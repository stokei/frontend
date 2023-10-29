import {
  Indicator as ChakraIndicator,
  IndicatorProps as ChakraIndicatorProps,
} from "@chakra-ui/react";

export interface IndicatorProps extends ChakraIndicatorProps {}
export const Indicator: React.FC<IndicatorProps> = ({ children, ...props }) => (
  <ChakraIndicator {...props}>{children}</ChakraIndicator>
);
