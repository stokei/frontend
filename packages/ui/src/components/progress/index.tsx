import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from "@chakra-ui/react";

export interface ProgressProps extends ChakraProgressProps {}

export const Progress: React.FC<ProgressProps> = ({ children, ...props }) => (
  <ChakraProgress colorScheme="primary" {...props}>
    {children}
  </ChakraProgress>
);
