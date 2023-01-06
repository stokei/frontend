import {
  Th as ChakraTableHeaderCell,
  TableColumnHeaderProps as ChakraTableHeaderCellProps,
} from "@chakra-ui/react";

export interface TableHeaderCellProps extends ChakraTableHeaderCellProps {}
export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  ...props
}) => <ChakraTableHeaderCell {...props}>{children}</ChakraTableHeaderCell>;
