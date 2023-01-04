import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogCloseButton as ChakraAlertDialogCloseButton,
  AlertDialogContent as ChakraAlertDialogContent,
  AlertDialogOverlay as ChakraAlertDialogOverlay,
  AlertDialogProps as ChakraAlertDialogProps,
} from "@chakra-ui/react";

export interface AlertDialogProps extends ChakraAlertDialogProps {}
export const AlertDialog: React.FC<AlertDialogProps> = ({
  children,
  ...props
}) => (
  <ChakraAlertDialog {...props}>
    <ChakraAlertDialogOverlay />
    <ChakraAlertDialogContent>
      <ChakraAlertDialogCloseButton />
      {children}
    </ChakraAlertDialogContent>
  </ChakraAlertDialog>
);
