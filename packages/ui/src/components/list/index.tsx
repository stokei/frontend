import React from "react";
import {
  List as ChakraList,
  ListProps as ChakraListProps,
} from "@chakra-ui/react";

export interface ListProps extends ChakraListProps {}
export const List = ({ children, ...props }: ListProps) => {
  return (
    <ChakraList spacing="2" {...props}>
      {children}
    </ChakraList>
  );
};
