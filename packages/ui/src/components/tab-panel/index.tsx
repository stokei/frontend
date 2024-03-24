import {
  TabPanel as ChakraTabPanel,
  TabPanelProps as ChakraTabPanelProps,
} from "@chakra-ui/react";

export interface TabPanelProps extends ChakraTabPanelProps {}
export const TabPanel = ({ children, ...props }: TabPanelProps) => (
  <ChakraTabPanel {...props}>{children}</ChakraTabPanel>
);
