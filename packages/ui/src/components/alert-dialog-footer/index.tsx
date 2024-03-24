import { AlertDialogFooter as ChakraAlertDialogFooter } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface AlertDialogFooterProps {}
export const AlertDialogFooter = ({
  children,
  ...props
}: PropsWithChildren<AlertDialogFooterProps>) => (
  <ChakraAlertDialogFooter {...props}>{children}</ChakraAlertDialogFooter>
);
