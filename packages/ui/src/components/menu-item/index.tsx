import {
  MenuItem as ChakraMenuItem,
  MenuItemProps as ChakraMenuItemProps,
} from "@chakra-ui/react";

export interface MenuItemProps extends ChakraMenuItemProps {}

export const MenuItem: React.FC<MenuItemProps> = ({ children, ...props }) => (
  <ChakraMenuItem paddingY="3" {...props}>
    {children}
  </ChakraMenuItem>
);
