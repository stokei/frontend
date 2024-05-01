import {
  InputGroup as ChakraInputGroup,
  InputGroupProps as ChakraInputGroupProps,
} from "@chakra-ui/react";

export interface InputGroupProps extends ChakraInputGroupProps {}

export const InputGroup = ({ ...props }: InputGroupProps) => (
  <ChakraInputGroup isolation="unset" {...props} />
);
