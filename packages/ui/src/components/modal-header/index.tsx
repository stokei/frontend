import {
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
} from "@chakra-ui/react";

export interface ModalHeaderProps extends ChakraModalHeaderProps {}
export const ModalHeader = ({ children, ...props }: ModalHeaderProps) => (
  <ChakraModalHeader paddingBottom="0" {...props}>
    {children}
  </ChakraModalHeader>
);
