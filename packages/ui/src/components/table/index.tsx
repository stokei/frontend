import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
} from "@chakra-ui/react";
import { Box } from "../box";

export interface TableProps extends ChakraTableProps {}
export const Table = ({ children, ...props }: TableProps) => (
  <Box width="full" flexDirection="column" overflow="hidden">
    <Box width="full" flexDirection="column" overflowX="auto">
      <ChakraTable variant="unstyled" {...props}>
        {children}
      </ChakraTable>
    </Box>
  </Box>
);
