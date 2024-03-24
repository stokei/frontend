import React from "react";
import {
  CheckboxGroup as ChakraCheckboxGroup,
  CheckboxGroupProps as ChakraCheckboxGroupProps,
} from "@chakra-ui/react";

export interface CheckboxGroupProps extends ChakraCheckboxGroupProps {}
export const CheckboxGroup = ({ children, ...props }: CheckboxGroupProps) => {
  return <ChakraCheckboxGroup {...props}>{children}</ChakraCheckboxGroup>;
};
