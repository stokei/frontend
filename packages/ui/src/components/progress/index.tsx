import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from "@chakra-ui/react";

export interface ProgressProps extends ChakraProgressProps {}

export const Progress = ({ children, ...props }: ProgressProps) => (
  <ChakraProgress colorScheme="primary" {...props}>
    {children}
  </ChakraProgress>
);
