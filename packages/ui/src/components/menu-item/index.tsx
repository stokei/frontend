import {
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from "@chakra-ui/react";

export interface MenuItemProps extends ChakraMenuItemProps {}

export const MenuItem = ({ children, ...props }: MenuItemProps) => (
  <ChakraMenuItem paddingY="3" {...props}>
    {children}
  </ChakraMenuItem>
);
