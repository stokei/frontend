import {
  ButtonGroup as ChakraButtonGroup,
  ButtonGroupProps as ChakraButtonGroupProps,
} from "@chakra-ui/react";

export interface ButtonGroupProps extends ChakraButtonGroupProps {}
export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => {
  return <ChakraButtonGroup {...props}>{children}</ChakraButtonGroup>;
};
