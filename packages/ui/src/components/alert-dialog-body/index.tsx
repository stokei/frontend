import { AlertDialogBody as ChakraAlertDialogBody } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface AlertDialogBodyProps {}
export const AlertDialogBody: React.FC<
  PropsWithChildren<AlertDialogBodyProps>
> = ({ children, ...props }) => (
  <ChakraAlertDialogBody {...props}>{children}</ChakraAlertDialogBody>
);
