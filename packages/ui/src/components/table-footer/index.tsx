import {
  Tfoot as ChakraTableFooter,
  TableFooterProps as ChakraTableFooterProps,
} from "@chakra-ui/react";

export interface TableFooterProps extends ChakraTableFooterProps {}
export const TableFooter = ({ children, ...props }: TableFooterProps) => (
  <ChakraTableFooter {...props}>{children}</ChakraTableFooter>
);
