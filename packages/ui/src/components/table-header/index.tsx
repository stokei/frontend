import {
  Thead as ChakraTableHeader,
  TableHeadProps as ChakraTableHeaderProps,
} from "@chakra-ui/react";

export interface TableHeaderProps extends ChakraTableHeaderProps {}
export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  ...props
}) => <ChakraTableHeader {...props}>{children}</ChakraTableHeader>;
