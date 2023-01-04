import { AlertDialogHeader as ChakraAlertDialogHeader } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface AlertDialogHeaderProps {}
export const AlertDialogHeader: React.FC<
  PropsWithChildren<AlertDialogHeaderProps>
> = ({ children, ...props }) => (
  <ChakraAlertDialogHeader {...props}>{children}</ChakraAlertDialogHeader>
);
