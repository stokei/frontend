import {
  Stat as ChakraStat,
  StatProps as ChakraStatProps,
} from "@chakra-ui/react";

export interface StatProps extends ChakraStatProps {}
export const Stat = ({ children, ...props }: StatProps) => (
  <ChakraStat {...props}>{children}</ChakraStat>
);
