import {
  Tbody as ChakraTableBody,
  TableBodyProps as ChakraTableBodyProps,
} from "@chakra-ui/react";

export interface TableBodyProps extends ChakraTableBodyProps {}
export const TableBody: React.FC<TableBodyProps> = ({ children, ...props }) => (
  <ChakraTableBody {...props}>{children}</ChakraTableBody>
);
