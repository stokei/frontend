import {
  ModalFooter as ChakraModalFooter,
  ModalFooterProps as ChakraModalFooterProps,
} from "@chakra-ui/react";

export interface ModalFooterProps extends ChakraModalFooterProps {}
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  ...props
}) => <ChakraModalFooter {...props}>{children}</ChakraModalFooter>;
