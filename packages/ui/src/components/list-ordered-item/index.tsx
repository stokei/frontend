import React from "react";
import {
  ListItem as ChakraListItem,
  ListItemProps as ChakraListItemProps,
} from "@chakra-ui/react";

export interface ListOrderedItemProps extends ChakraListItemProps {}
export const ListOrderedItem: React.FC<ListOrderedItemProps> = ({
  children,
  ...props
}) => {
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
