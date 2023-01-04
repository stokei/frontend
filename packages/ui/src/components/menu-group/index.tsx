import {
  MenuOptionGroup as ChakraMenuOptionGroup,
  MenuOptionGroupProps as ChakraMenuOptionGroupProps,
} from "@chakra-ui/react";

export interface MenuOptionGroupProps extends ChakraMenuOptionGroupProps {}

export const MenuOptionGroup: React.FC<MenuOptionGroupProps> = ({
  children,
  ...props
}) => <ChakraMenuOptionGroup {...props}>{children}</ChakraMenuOptionGroup>;
