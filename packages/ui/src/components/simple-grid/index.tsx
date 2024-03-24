import {
  SimpleGrid as ChakraSimpleGrid,
  SimpleGridProps as ChakraSimpleGridProps,
} from "@chakra-ui/react";

export interface SimpleGridProps extends ChakraSimpleGridProps {}
export const SimpleGrid = ({ children, ...props }: SimpleGridProps) => (
  <ChakraSimpleGrid width="full" {...props}>
    {children}
  </ChakraSimpleGrid>
);
