import {
  TabPanel as ChakraTabPanel,
  TabPanelProps as ChakraTabPanelProps,
} from "@chakra-ui/react";

export interface TabPanelProps extends ChakraTabPanelProps {}
export const TabPanel: React.FC<TabPanelProps> = ({ children, ...props }) => (
  <ChakraTabPanel {...props}>{children}</ChakraTabPanel>
);
