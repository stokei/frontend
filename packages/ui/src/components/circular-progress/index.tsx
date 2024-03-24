import {
  CircularProgress as ChakraCircularProgress,
  CircularProgressProps as ChakraCircularProgressProps,
} from "@chakra-ui/react";

export interface CircularProgressProps extends ChakraCircularProgressProps {}

export const CircularProgress = ({
  children,
  ...props
}: CircularProgressProps) => (
  <ChakraCircularProgress color="primary.500" {...props}>
    {children}
  </ChakraCircularProgress>
);
