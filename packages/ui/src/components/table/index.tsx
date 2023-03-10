import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from "@chakra-ui/react";

export interface TableProps extends ChakraTableProps {}
export const Table: React.FC<TableProps> = ({ children, ...props }) => (
  <ChakraTable variant="striped" colorScheme="background" {...props}>
    {children}
  </ChakraTable>
);
