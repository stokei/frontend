import {
  TabPanels as ChakraTabPanels,
  TabPanelsProps as ChakraTabPanelsProps,
} from "@chakra-ui/react";

export interface TabPanelsProps extends ChakraTabPanelsProps {}
export const TabPanels = ({ children, ...props }: TabPanelsProps) => (
  <ChakraTabPanels {...props}>{children}</ChakraTabPanels>
);
