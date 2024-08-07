import {
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from "@chakra-ui/react";

export interface ModalBodyProps extends ChakraModalBodyProps { }
export const ModalBody = ({ children, ...props }: ModalBodyProps) => (
  <ChakraModalBody overflowX="auto" paddingY="5" {...props}>
    {children}
  </ChakraModalBody>
);
