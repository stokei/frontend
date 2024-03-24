import {
  Square as ChakraSquare,
  SquareProps as ChakraSquareProps,
} from "@chakra-ui/react";

export interface SquareProps extends ChakraSquareProps {}
export const Square = ({ children, ...props }: SquareProps) => (
  <ChakraSquare {...props}>{children}</ChakraSquare>
);
