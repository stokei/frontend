import {
  Grid as ChakraGrid,
  GridProps as ChakraGridProps,
} from "@chakra-ui/react";

export interface GridProps extends ChakraGridProps {}
export const Grid = ({ children, ...props }: GridProps) => (
  <ChakraGrid width="full" {...props}>
    {children}
  </ChakraGrid>
);
