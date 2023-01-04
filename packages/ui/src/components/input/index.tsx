import {
  forwardRef,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { ForwardedRef } from "react";

export interface InputProps extends ChakraInputProps {
  readonly id: string;
  readonly ref?: ForwardedRef<any>;
}

export const Input: React.FC<InputProps> = forwardRef(
  ({ isLoading, ...props }, ref) => (
    <ChakraInput
      focusBorderColor="primary.500"
      colorScheme="primary"
      size="md"
      {...props}
      ref={ref}
      errorBorderColor="error.500"
    />
  )
);
