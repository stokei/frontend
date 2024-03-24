import {
  CircularProgressLabel as ChakraCircularProgressLabel,
  CircularProgressLabelProps as ChakraCircularProgressLabelProps,
} from "@chakra-ui/react";

export interface CircularProgressLabelProps
  extends ChakraCircularProgressLabelProps {}

export const CircularProgressLabel = ({
  children,
  ...props
}: CircularProgressLabelProps) => (
  <ChakraCircularProgressLabel color="primary.500" {...props}>
    {children}
  </ChakraCircularProgressLabel>
);
