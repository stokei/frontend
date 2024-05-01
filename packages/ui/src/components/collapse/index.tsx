import {
  Collapse as ChakraCollapse,
  CollapseProps as ChakraCollapseProps,
} from "@chakra-ui/react";

export interface CollapseProps extends ChakraCollapseProps {}
export const Collapse = ({ children, ...props }: CollapseProps) => (
  <ChakraCollapse {...props}>{children}</ChakraCollapse>
);
