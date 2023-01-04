import {
  GridItem as ChakraGridItem,
  GridItemProps as ChakraGridItemProps,
} from "@chakra-ui/react";

export interface GridItemProps extends ChakraGridItemProps {}
export const GridItem: React.FC<GridItemProps> = ({ children, ...props }) => (
  <ChakraGridItem {...props}>{children}</ChakraGridItem>
);
