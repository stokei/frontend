import {
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from "@chakra-ui/react";

export interface ModalFooterProps extends ChakraModalFooterProps {}
export const ModalFooter = ({ children, ...props }: ModalFooterProps) => (
  <ChakraModalFooter {...props}>{children}</ChakraModalFooter>
);
