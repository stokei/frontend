import {
  TableCaption as ChakraTableCaption,
  TableCaptionProps as ChakraTableCaptionProps,
} from "@chakra-ui/react";

export interface TableCaptionProps extends ChakraTableCaptionProps {}
export const TableCaption = ({ children, ...props }: TableCaptionProps) => (
  <ChakraTableCaption {...props}>{children}</ChakraTableCaption>
);
