import {
  Stack as ChakraStack,
  StackProps as ChakraStackProps,
} from "@chakra-ui/react";

export interface StackProps extends ChakraStackProps {}

export const Stack: React.FC<StackProps> = ({ children, ...props }) => (
  <ChakraStack {...props}>{children}</ChakraStack>
);
