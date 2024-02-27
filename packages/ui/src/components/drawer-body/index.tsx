import { DrawerBody as ChakraDrawerBody } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ModalBodyProps } from "../modal-body";

export interface DrawerBodyProps extends ModalBodyProps {}
export const DrawerBody = ({
  children,
  ...props
}: PropsWithChildren<DrawerBodyProps>) => (
  <ChakraDrawerBody {...props}>{children}</ChakraDrawerBody>
);
