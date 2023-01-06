import {
  TableCaption as ChakraTableCaption,
  TableCaptionProps as ChakraTableCaptionProps,
} from "@chakra-ui/react";

export interface TableCaptionProps extends ChakraTableCaptionProps {}
export const TableCaption: React.FC<TableCaptionProps> = ({
  children,
  ...props
}) => <ChakraTableCaption {...props}>{children}</ChakraTableCaption>;
