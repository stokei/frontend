import {
  TabList as ChakraTabList,
  TabListProps as ChakraTabListProps,
} from "@chakra-ui/react";

export interface TabListProps extends ChakraTabListProps {}
export const TabList: React.FC<TabListProps> = ({ children, ...props }) => (
  <ChakraTabList {...props}>{children}</ChakraTabList>
);
