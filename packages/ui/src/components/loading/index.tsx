import {
  Spinner as ChakraSpinner,
  SpinnerProps as ChakraSpinnerProps,
} from "@chakra-ui/react";

export interface LoadingProps extends ChakraSpinnerProps {}

export const Loading: React.FC<LoadingProps> = ({ children, ...props }) => (
  <ChakraSpinner
    color="primary.500"
    emptyColor="gray.200"
    speed="0.65s"
    {...props}
  >
    {children}
  </ChakraSpinner>
);
