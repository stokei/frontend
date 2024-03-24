import {
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
} from "@chakra-ui/react";

export interface MenuButtonProps extends ChakraMenuButtonProps {}

export const MenuButton = ({ children, ...props }: MenuButtonProps) => (
  <ChakraMenuButton {...props}>{children}</ChakraMenuButton>
);
