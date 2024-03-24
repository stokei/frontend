import {
  Circle as ChakraCircle,
  SquareProps as ChakraCircleProps,
} from "@chakra-ui/react";

export interface CircleProps extends ChakraCircleProps {}
export const Circle = ({ children, ...props }: CircleProps) => (
  <ChakraCircle {...props}>{children}</ChakraCircle>
);
