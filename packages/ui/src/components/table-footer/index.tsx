import {
  Tfoot as ChakraTableFooter,
  TableFooterProps as ChakraTableFooterProps,
} from "@chakra-ui/react";

export interface TableFooterProps extends ChakraTableFooterProps {}
export const TableFooter: React.FC<TableFooterProps> = ({
  children,
  ...props
}) => <ChakraTableFooter {...props}>{children}</ChakraTableFooter>;
