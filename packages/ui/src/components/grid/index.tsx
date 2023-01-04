import {
  Grid as ChakraGrid,
  GridProps as ChakraGridProps,
} from "@chakra-ui/react";

export interface GridProps extends ChakraGridProps {}
export const Grid: React.FC<GridProps> = ({ children, ...props }) => (
  <ChakraGrid width="full" {...props}>
    {children}
  </ChakraGrid>
);
