import {
  Th as ChakraTableHeaderCell,
  TableColumnHeaderProps as ChakraTableHeaderCellProps,
} from "@chakra-ui/react";

export interface TableHeaderCellProps extends ChakraTableHeaderCellProps {}
export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  ...props
}) => (
  <ChakraTableHeaderCell
    paddingTop="0"
    css={{
      "&:first-child": {
        paddingLeft: "0",
      },
      "&:last-child": {
        paddingRight: "0",
      },
    }}
    {...props}
  >
    {children}
  </ChakraTableHeaderCell>
);
