import {
  ModalBody as ChakraModalBody,
  ModalBodyProps as ChakraModalBodyProps,
} from "@chakra-ui/react";

export interface ModalBodyProps extends ChakraModalBodyProps {}
export const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => (
  <ChakraModalBody paddingY="5" {...props}>
    {children}
  </ChakraModalBody>
);
