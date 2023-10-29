import {
  Circle as ChakraCircle,
  SquareProps as ChakraCircleProps,
} from "@chakra-ui/react";

export interface CircleProps extends ChakraCircleProps {}
export const Circle: React.FC<CircleProps> = ({ children, ...props }) => (
  <ChakraCircle {...props}>{children}</ChakraCircle>
);
