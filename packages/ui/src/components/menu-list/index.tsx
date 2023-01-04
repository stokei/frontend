import {
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
} from "@chakra-ui/react";

export interface MenuListProps extends ChakraMenuListProps {}

export const MenuList: React.FC<MenuListProps> = ({ children, ...props }) => (
  <ChakraMenuList {...props}>{children}</ChakraMenuList>
);
