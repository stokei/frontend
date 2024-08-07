import {
  forwardRef,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";

export interface TextareaProps extends ChakraTextareaProps {}

export const Textarea = forwardRef((props: TextareaProps, ref) => (
  <ChakraTextarea
    colorScheme="primary"
    {...props}
    ref={ref}
    focusBorderColor="primary.500"
    errorBorderColor="error.500"
    resize="vertical"
  />
));
