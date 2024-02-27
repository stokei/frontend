import {
  Wrap as ChakraWrap,
  WrapProps as ChakraWrapProps,
} from "@chakra-ui/react";

export interface WrapProps extends ChakraWrapProps {}

export const Wrap = ({ children, ...props }: WrapProps) => (
  <ChakraWrap {...props}>{children}</ChakraWrap>
);
