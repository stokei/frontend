import {
  StatGroup as ChakraStatGroup,
  StatGroupProps as ChakraStatGroupProps,
} from "@chakra-ui/react";

export interface StatGroupProps extends ChakraStatGroupProps {}
export const StatGroup = ({ children, ...props }: StatGroupProps) => (
  <ChakraStatGroup {...props}>{children}</ChakraStatGroup>
);
