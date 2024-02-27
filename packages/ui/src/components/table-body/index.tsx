import {
  Tbody as ChakraTableBody,
  TableBodyProps as ChakraTableBodyProps,
} from "@chakra-ui/react";

export interface TableBodyProps extends ChakraTableBodyProps {}
export const TableBody = ({ children, ...props }: TableBodyProps) => (
  <ChakraTableBody {...props}>{children}</ChakraTableBody>
);
