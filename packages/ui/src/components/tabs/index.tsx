import {
  Tabs as ChakraTabs,
  TabsProps as ChakraTabsProps,
} from "@chakra-ui/react";

export interface TabsProps extends ChakraTabsProps {}
export const Tabs: React.FC<TabsProps> = ({ children, ...props }) => (
  <ChakraTabs {...props}>{children}</ChakraTabs>
);
