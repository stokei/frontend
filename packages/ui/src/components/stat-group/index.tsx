import {
  StatGroup as ChakraStatGroup,
  StatGroupProps as ChakraStatGroupProps,
} from "@chakra-ui/react";

export interface StatGroupProps extends ChakraStatGroupProps {}
export const StatGroup: React.FC<StatGroupProps> = ({ children, ...props }) => (
  <ChakraStatGroup {...props}>{children}</ChakraStatGroup>
);
