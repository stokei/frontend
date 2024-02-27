import React from "react";
import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
} from "@chakra-ui/react";

export interface ListItemProps extends ChakraListItemProps {}
export const ListItem = ({ children, ...props }: ListItemProps) => {
  return (
    <ChakraListItem display="flex" alignItems="center" {...props}>
      {children}
    </ChakraListItem>
  );
};
