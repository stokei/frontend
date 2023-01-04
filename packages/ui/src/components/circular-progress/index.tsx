import {
  CircularProgress as ChakraCircularProgress,
  CircularProgressProps as ChakraCircularProgressProps,
} from "@chakra-ui/react";

export interface CircularProgressProps extends ChakraCircularProgressProps {}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  children,
  ...props
}) => (
  <ChakraCircularProgress color="primary.500" {...props}>
    {children}
  </ChakraCircularProgress>
);
