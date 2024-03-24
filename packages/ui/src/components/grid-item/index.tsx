import {
  GridItem as ChakraGridItem,
  GridItemProps as ChakraGridItemProps,
} from "@chakra-ui/react";

export interface GridItemProps extends ChakraGridItemProps {}
export const GridItem = ({ children, ...props }: GridItemProps) => (
  <ChakraGridItem {...props}>{children}</ChakraGridItem>
);
