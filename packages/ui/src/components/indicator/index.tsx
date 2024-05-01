import {
  Indicator as ChakraIndicator,
  IndicatorProps as ChakraIndicatorProps,
} from "@chakra-ui/react";

export interface IndicatorProps extends ChakraIndicatorProps {}
export const Indicator = ({ children, ...props }: IndicatorProps) => (
  <ChakraIndicator {...props}>{children}</ChakraIndicator>
);
