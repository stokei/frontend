import { AlertDialogBody as ChakraAlertDialogBody } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface AlertDialogBodyProps {}
export const AlertDialogBody = ({
  children,
  ...props
}: PropsWithChildren<AlertDialogBodyProps>) => (
  <ChakraAlertDialogBody {...props}>{children}</ChakraAlertDialogBody>
);
