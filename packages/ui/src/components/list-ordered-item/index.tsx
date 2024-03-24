import React from "react";
import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
} from "@chakra-ui/react";

export interface ListOrderedItemProps extends ChakraListItemProps {}
export const ListOrderedItem = ({
  children,
  ...props
}: ListOrderedItemProps) => {
  return (
    <ChakraListItem
      color="text.500"
      sx={{
        "&::marker": {
          fontWeight: "bold",
          color: "primary.500",
        },
      }}
      {...props}
    >
      {children}
    </ChakraListItem>
  );
};
