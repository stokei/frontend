import {
  ModalHeader as ChakraModalHeader,
  ModalHeaderProps as ChakraModalHeaderProps,
} from "@chakra-ui/react";

export interface ModalHeaderProps extends ChakraModalHeaderProps {}
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  ...props
}) => (
  <ChakraModalHeader paddingBottom="0" {...props}>
    {children}
  </ChakraModalHeader>
);
