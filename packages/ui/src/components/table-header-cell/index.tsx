import {
  Th as ChakraTableHeaderCell,
  TableColumnHeaderProps as ChakraTableHeaderCellProps,
} from "@chakra-ui/react";

export interface TableHeaderCellProps extends ChakraTableHeaderCellProps {}
export const TableHeaderCell = ({
  children,
  ...props
}: TableHeaderCellProps) => (
  <ChakraTableHeaderCell
    paddingTop="0"
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
  </ChakraTableHeaderCell>
);
