import {
  Tr as ChakraTableRow,
  TableRowProps as ChakraTableRowProps,
} from "@chakra-ui/react";

export interface TableRowProps extends ChakraTableRowProps {}
export const TableRow = ({ children, onClick, ...props }: TableRowProps) => (
  <ChakraTableRow
    onClick={onClick}
    _hover={
      onClick
        ? {
            cursor: "pointer",
            background: "background.100",
          }
        : {}
    }
    {...props}
  >
    {children}
  </ChakraTableRow>
);
