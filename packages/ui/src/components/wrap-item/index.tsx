import {
  WrapItem as ChakraWrapItem,
  WrapItemProps as ChakraWrapItemProps,
} from "@chakra-ui/react";

export interface WrapItemProps extends ChakraWrapItemProps {}

export const WrapItem: React.FC<WrapItemProps> = ({ children, ...props }) => (
  <ChakraWrapItem {...props}>{children}</ChakraWrapItem>
);
