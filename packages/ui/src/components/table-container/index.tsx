import {
  TableContainer as ChakraTableContainer,
  TableContainerProps as ChakraTableContainerProps,
} from "@chakra-ui/react";

export interface TableContainerProps extends ChakraTableContainerProps {}
export const TableContainer: React.FC<TableContainerProps> = ({
  children,
  ...props
}) => <ChakraTableContainer {...props}>{children}</ChakraTableContainer>;
