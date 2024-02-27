import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
} from "@chakra-ui/react";

export interface FormControlProps extends ChakraFormControlProps {}

export const FormControl = ({ ...props }: FormControlProps) => (
  <ChakraFormControl colorScheme="primary" {...props} />
);
