import { AlertDialogFooter as ChakraAlertDialogFooter } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface AlertDialogFooterProps {}
export const AlertDialogFooter: React.FC<
  PropsWithChildren<AlertDialogFooterProps>
> = ({ children, ...props }) => (
  <ChakraAlertDialogFooter {...props}>{children}</ChakraAlertDialogFooter>
);
