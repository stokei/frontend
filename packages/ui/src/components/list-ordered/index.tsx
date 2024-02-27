import React from "react";
import {
  OrderedList as ChakraOrderedList,
  ListProps as ChakraListProps,
} from "@chakra-ui/react";

export interface ListOrderedProps extends ChakraListProps {}
export const ListOrdered = ({ children, ...props }: ListOrderedProps) => {
  return (
    <ChakraOrderedList
      display="flex"
      flexDirection="column"
      listStylePosition="inside"
      spacing="2"
      {...props}
    >
      {children}
    </ChakraOrderedList>
  );
};
