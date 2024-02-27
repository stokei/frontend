import {
  forwardRef,
  Stack as ChakraStack,
  StackProps as ChakraStackProps,
} from "@chakra-ui/react";
import { ForwardedRef } from "react";

export interface StackProps extends ChakraStackProps {
  readonly ref?: ForwardedRef<any>;
}

export const Stack = forwardRef(({ children, ...props }: StackProps, ref) => (
  <ChakraStack width="full" {...props} ref={ref}>
    {children}
  </ChakraStack>
));
