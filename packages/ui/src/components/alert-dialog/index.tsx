import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogCloseButton as ChakraAlertDialogCloseButton,
  AlertDialogContent as ChakraAlertDialogContent,
  AlertDialogOverlay as ChakraAlertDialogOverlay,
  AlertDialogProps as ChakraAlertDialogProps,
} from "@chakra-ui/react";

export interface AlertDialogProps extends ChakraAlertDialogProps {}
export const AlertDialog = ({ children, ...props }: AlertDialogProps) => (
  <ChakraAlertDialog {...props}>
    <ChakraAlertDialogOverlay />
    <ChakraAlertDialogContent>
      <ChakraAlertDialogCloseButton />
      {children}
    </ChakraAlertDialogContent>
  </ChakraAlertDialog>
);
