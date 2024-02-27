import {
  TabList as ChakraTabList,
  TabListProps as ChakraTabListProps,
} from "@chakra-ui/react";

export interface TabListProps extends ChakraTabListProps {}
export const TabList = ({ children, ...props }: TabListProps) => (
  <ChakraTabList {...props}>{children}</ChakraTabList>
);
