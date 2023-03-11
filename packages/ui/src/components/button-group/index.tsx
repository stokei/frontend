import {
  ButtonGroup as ChakraButtonGroup,
  ButtonGroupProps as ChakraButtonGroupProps,
} from "@chakra-ui/react";

export interface ButtonGroupProps extends ChakraButtonGroupProps {}
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  ...props
}) => {
  return <ChakraButtonGroup {...props}>{children}</ChakraButtonGroup>;
};
