import {
  Tr as ChakraTableRow,
  TableRowProps as ChakraTableRowProps,
} from "@chakra-ui/react";

export interface TableRowProps extends ChakraTableRowProps {}
export const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => (
  <ChakraTableRow {...props}>{children}</ChakraTableRow>
);
