import {
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
} from "@chakra-ui/react";

export interface MenuProps extends ChakraMenuProps {}
export const Menu: React.FC<MenuProps> = ({ children, ...props }) => (
  <ChakraMenu {...props}>{children}</ChakraMenu>
);
