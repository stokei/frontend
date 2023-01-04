import {
  CircularProgressLabel as ChakraCircularProgressLabel,
  CircularProgressLabelProps as ChakraCircularProgressLabelProps,
} from "@chakra-ui/react";

export interface CircularProgressLabelProps
  extends ChakraCircularProgressLabelProps {}

export const CircularProgressLabel: React.FC<CircularProgressLabelProps> = ({
  children,
  ...props
}) => (
  <ChakraCircularProgressLabel color="primary.500" {...props}>
    {children}
  </ChakraCircularProgressLabel>
);
