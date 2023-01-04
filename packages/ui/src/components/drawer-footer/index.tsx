import { DrawerFooter as ChakraDrawerFooter } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface DrawerFooterProps {}
export const DrawerFooter: React.FC<PropsWithChildren<DrawerFooterProps>> = ({
  children,
  ...props
}) => <ChakraDrawerFooter {...props}>{children}</ChakraDrawerFooter>;
