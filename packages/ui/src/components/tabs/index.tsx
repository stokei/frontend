import {
  Tabs as ChakraTabs,
  TabsProps as ChakraTabsProps,
} from "@chakra-ui/react";

export interface TabsProps extends ChakraTabsProps {}
export const Tabs = ({ children, ...props }: TabsProps) => (
  <ChakraTabs {...props}>{children}</ChakraTabs>
);
