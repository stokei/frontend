import {
  TabPanels as ChakraTabPanels,
  TabPanelsProps as ChakraTabPanelsProps,
} from "@chakra-ui/react";

export interface TabPanelsProps extends ChakraTabPanelsProps {}
export const TabPanels: React.FC<TabPanelsProps> = ({ children, ...props }) => (
  <ChakraTabPanels {...props}>{children}</ChakraTabPanels>
);
