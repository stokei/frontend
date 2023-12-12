import {
  Collapse as ChakraCollapse,
  CollapseProps as ChakraCollapseProps,
} from "@chakra-ui/react";

export interface CollapseProps extends ChakraCollapseProps {}
export const Collapse: React.FC<CollapseProps> = ({ children, ...props }) => (
  <ChakraCollapse {...props}>{children}</ChakraCollapse>
);
