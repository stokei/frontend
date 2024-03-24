import {
  Modal as ChakraModal,
  ModalCloseButton as ChakraModalCloseButton,
  ModalContent as ChakraModalContent,
  ModalOverlay as ChakraModalOverlay,
  ModalProps as ChakraModalProps,
} from "@chakra-ui/react";

export interface ModalProps extends ChakraModalProps {}
export const Modal = ({ children, ...props }: ModalProps) => (
  <ChakraModal
    scrollBehavior="inside"
    size={["full", "full", "lg", "lg"]}
    {...props}
  >
    <ChakraModalOverlay />
    <ChakraModalContent background="background.50">
      <ChakraModalCloseButton />
      {children}
    </ChakraModalContent>
  </ChakraModal>
);
