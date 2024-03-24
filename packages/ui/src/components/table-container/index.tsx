import {
  TableContainer as ChakraTableContainer,
  TableContainerProps as ChakraTableContainerProps,
} from "@chakra-ui/react";

export interface TableContainerProps extends ChakraTableContainerProps {}
export const TableContainer = ({ children, ...props }: TableContainerProps) => (
  <ChakraTableContainer {...props}>{children}</ChakraTableContainer>
);
