import {
  MenuDivider as ChakraMenuDivider,
  MenuDividerProps as ChakraMenuDividerProps,
} from "@chakra-ui/react";

export interface MenuDividerProps extends ChakraMenuDividerProps {}

export const MenuDivider = ({ children, ...props }: MenuDividerProps) => (
  <ChakraMenuDivider {...props}>{children}</ChakraMenuDivider>
);
