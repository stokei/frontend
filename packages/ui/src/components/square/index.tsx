import {
  Square as ChakraSquare,
  SquareProps as ChakraSquareProps,
} from "@chakra-ui/react";

export interface SquareProps extends ChakraSquareProps {}
export const Square: React.FC<SquareProps> = ({ children, ...props }) => (
  <ChakraSquare {...props}>{children}</ChakraSquare>
);
