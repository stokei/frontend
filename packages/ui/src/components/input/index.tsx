import {
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { ForwardedRef } from "react";

export interface InputProps extends ChakraInputProps {
  readonly id: string;
  readonly isLoading?: boolean;
  readonly ref?: ForwardedRef<any>;
}

export const Input = forwardRef(({ isLoading, ...props }: InputProps, ref) => (
  <ChakraInput
    focusBorderColor="primary.500"
    colorScheme="primary"
    size="md"
    {...props}
    ref={ref}
    errorBorderColor="error.500"
  />
));
