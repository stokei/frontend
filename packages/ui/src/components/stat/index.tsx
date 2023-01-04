import {
  Stat as ChakraStat,
  StatProps as ChakraStatProps,
} from "@chakra-ui/react";

export interface StatProps extends ChakraStatProps {}
export const Stat: React.FC<StatProps> = ({ children, ...props }) => (
  <ChakraStat {...props}>{children}</ChakraStat>
);
