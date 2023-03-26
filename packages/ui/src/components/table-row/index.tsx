import {
  Tr as ChakraTableRow,
  TableRowProps as ChakraTableRowProps,
} from "@chakra-ui/react";

export interface TableRowProps extends ChakraTableRowProps {}
export const TableRow: React.FC<TableRowProps> = ({
  children,
  onClick,
  ...props
}) => (
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
