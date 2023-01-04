import { DrawerHeader as ChakraDrawerHeader } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface DrawerHeaderProps {}
export const DrawerHeader: React.FC<PropsWithChildren<DrawerHeaderProps>> = ({
  children,
  ...props
}) => <ChakraDrawerHeader {...props}>{children}</ChakraDrawerHeader>;
