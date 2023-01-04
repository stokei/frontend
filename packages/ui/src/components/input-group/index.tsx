import {
  InputGroup as ChakraInputGroup,
  InputGroupProps as ChakraInputGroupProps,
} from "@chakra-ui/react";

export interface InputGroupProps extends ChakraInputGroupProps {}

export const InputGroup: React.FC<InputGroupProps> = ({ ...props }) => (
  <ChakraInputGroup {...props} />
);
