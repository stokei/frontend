import { DrawerFooter as ChakraDrawerFooter } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface DrawerFooterProps {}
export const DrawerFooter = ({
  children,
  ...props
}: PropsWithChildren<DrawerFooterProps>) => (
  <ChakraDrawerFooter {...props}>{children}</ChakraDrawerFooter>
);
