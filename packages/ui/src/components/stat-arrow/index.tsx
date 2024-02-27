import {
  StatArrow as ChakraStatArrow,
  StatArrowProps as ChakraStatArrowProps,
} from "@chakra-ui/react";

export interface StatArrowProps extends ChakraStatArrowProps {}
export const StatArrow = ({ children, ...props }: StatArrowProps) => (
  <ChakraStatArrow {...props}>{children}</ChakraStatArrow>
);
