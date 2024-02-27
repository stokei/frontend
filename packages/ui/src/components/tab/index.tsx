import { Tab as ChakraTab, TabProps as ChakraTabProps } from "@chakra-ui/react";

export interface TabProps extends ChakraTabProps {}
export const Tab = ({ children, ...props }: TabProps) => (
  <ChakraTab {...props}>{children}</ChakraTab>
);
