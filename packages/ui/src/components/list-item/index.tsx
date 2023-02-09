import React from "react";
import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
} from "@chakra-ui/react";

export interface ListItemProps extends ChakraListItemProps {}
export const ListItem: React.FC<ListItemProps> = ({ children, ...props }) => {
  return (
    <ChakraListItem display="flex" alignItems="center" {...props}>
      {children}
    </ChakraListItem>
  );
};
