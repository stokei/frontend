import { DrawerHeader as ChakraDrawerHeader } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface DrawerHeaderProps {}
export const DrawerHeader = ({
  children,
  ...props
}: PropsWithChildren<DrawerHeaderProps>) => (
  <ChakraDrawerHeader {...props}>{children}</ChakraDrawerHeader>
);
