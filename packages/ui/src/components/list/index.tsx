import React from "react";
import {
  List as ChakraList,
  ListProps as ChakraListProps,
} from "@chakra-ui/react";

export interface ListProps extends ChakraListProps {}
export const List: React.FC<ListProps> = ({ children, ...props }) => {
  return <ChakraList {...props}>{children}</ChakraList>;
};
