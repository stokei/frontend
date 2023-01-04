import { DrawerBody as ChakraDrawerBody } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface DrawerBodyProps {}
export const DrawerBody: React.FC<PropsWithChildren<DrawerBodyProps>> = ({
  children,
  ...props
}) => <ChakraDrawerBody {...props}>{children}</ChakraDrawerBody>;
