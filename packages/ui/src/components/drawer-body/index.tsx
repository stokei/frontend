import { DrawerBody as ChakraDrawerBody } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ModalBodyProps } from "../modal-body";

export interface DrawerBodyProps extends ModalBodyProps {}
export const DrawerBody: React.FC<PropsWithChildren<DrawerBodyProps>> = ({
  children,
  ...props
}) => <ChakraDrawerBody {...props}>{children}</ChakraDrawerBody>;
