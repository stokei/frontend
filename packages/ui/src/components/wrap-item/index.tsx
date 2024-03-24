import {
  WrapItem as ChakraWrapItem,
  WrapItemProps as ChakraWrapItemProps,
} from "@chakra-ui/react";

export interface WrapItemProps extends ChakraWrapItemProps {}

export const WrapItem = ({ children, ...props }: WrapItemProps) => (
  <ChakraWrapItem {...props}>{children}</ChakraWrapItem>
);
