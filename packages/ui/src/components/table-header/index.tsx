import {
  Thead as ChakraTableHeader,
  TableHeadProps as ChakraTableHeaderProps,
} from "@chakra-ui/react";

export interface TableHeaderProps extends ChakraTableHeaderProps {}
export const TableHeader = ({ children, ...props }: TableHeaderProps) => (
  <ChakraTableHeader {...props}>{children}</ChakraTableHeader>
);
