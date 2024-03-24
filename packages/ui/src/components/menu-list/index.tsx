import {
  MenuList as ChakraMenuList,
  MenuListProps as ChakraMenuListProps,
} from "@chakra-ui/react";

export interface MenuListProps extends ChakraMenuListProps {}

export const MenuList = ({ children, ...props }: MenuListProps) => (
  <ChakraMenuList {...props}>{children}</ChakraMenuList>
);
