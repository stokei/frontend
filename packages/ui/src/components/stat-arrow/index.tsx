import {
  StatArrow as ChakraStatArrow,
  StatArrowProps as ChakraStatArrowProps,
} from "@chakra-ui/react";

export interface StatArrowProps extends ChakraStatArrowProps {}
export const StatArrow: React.FC<StatArrowProps> = ({ children, ...props }) => (
  <ChakraStatArrow {...props}>{children}</ChakraStatArrow>
);
