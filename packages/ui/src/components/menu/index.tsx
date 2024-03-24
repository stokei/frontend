import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
} from "@chakra-ui/react";

export interface MenuProps extends ChakraMenuProps {}
export const Menu = ({ children, ...props }: MenuProps) => (
  <ChakraMenu {...props}>{children}</ChakraMenu>
);
