import {
  MenuOptionGroup as ChakraMenuOptionGroup,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
} from "@chakra-ui/react";

export interface MenuOptionGroupProps extends ChakraMenuOptionGroupProps {}

export const MenuOptionGroup = ({
  children,
  ...props
}: MenuOptionGroupProps) => (
  <ChakraMenuOptionGroup {...props}>{children}</ChakraMenuOptionGroup>
);
