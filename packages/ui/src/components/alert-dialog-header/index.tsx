import { AlertDialogHeader as ChakraAlertDialogHeader } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface AlertDialogHeaderProps {}
export const AlertDialogHeader = ({
  children,
  ...props
}: PropsWithChildren<AlertDialogHeaderProps>) => (
  <ChakraAlertDialogHeader {...props}>{children}</ChakraAlertDialogHeader>
);
