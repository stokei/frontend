import {
  Td as ChakraTableCell,
  TableCellProps as ChakraTableCellProps,
} from "@chakra-ui/react";

export interface TableCellProps extends ChakraTableCellProps {}
export const TableCell: React.FC<TableCellProps> = ({ children, ...props }) => (
  <ChakraTableCell
    css={{
      "&:first-of-type": {
        paddingLeft: "0",
      },
      "&:last-of-type": {
        paddingRight: "0",
      },
    }}
    {...props}
  >
    {children}
  </ChakraTableCell>
);
