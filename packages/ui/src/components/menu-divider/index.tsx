import {
  MenuDivider as ChakraMenuDivider,
  MenuDividerProps as ChakraMenuDividerProps,
} from "@chakra-ui/react";

export interface MenuDividerProps extends ChakraMenuDividerProps {}

export const MenuDivider: React.FC<MenuDividerProps> = ({
  children,
  ...props
}) => <ChakraMenuDivider {...props}>{children}</ChakraMenuDivider>;
