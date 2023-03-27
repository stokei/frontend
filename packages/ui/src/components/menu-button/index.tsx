import {
  MenuButton as ChakraMenuButton,
  MenuButtonProps as ChakraMenuButtonProps,
} from "@chakra-ui/react";

export interface MenuButtonProps extends ChakraMenuButtonProps {}

export const MenuButton: React.FC<MenuButtonProps> = ({
  children,
  ...props
}) => <ChakraMenuButton {...props}>{children}</ChakraMenuButton>;
