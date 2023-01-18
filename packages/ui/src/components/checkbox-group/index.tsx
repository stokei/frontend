import React from "react";
import {
  CheckboxGroup as ChakraCheckboxGroup,
  CheckboxGroupProps as ChakraCheckboxGroupProps,
} from "@chakra-ui/react";

export interface CheckboxGroupProps extends ChakraCheckboxGroupProps {}
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  ...props
}) => {
  return <ChakraCheckboxGroup {...props}>{children}</ChakraCheckboxGroup>;
};
