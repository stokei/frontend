import {
  Wrap as ChakraWrap,
  WrapProps as ChakraWrapProps,
} from "@chakra-ui/react";

export interface WrapProps extends ChakraWrapProps {}

export const Wrap: React.FC<WrapProps> = ({ children, ...props }) => (
  <ChakraWrap {...props}>{children}</ChakraWrap>
);
