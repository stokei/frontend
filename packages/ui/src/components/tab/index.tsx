import { Tab as ChakraTab, TabProps as ChakraTabProps } from "@chakra-ui/react";

export interface TabProps extends ChakraTabProps {}
export const Tab: React.FC<TabProps> = ({ children, ...props }) => (
  <ChakraTab {...props}>{children}</ChakraTab>
);
