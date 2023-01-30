import {
  SimpleGrid as ChakraSimpleGrid,
  SimpleGridProps as ChakraSimpleGridProps,
} from "@chakra-ui/react";

export interface SimpleGridProps extends ChakraSimpleGridProps {}
export const SimpleGrid: React.FC<SimpleGridProps> = ({
  children,
  ...props
}) => (
  <ChakraSimpleGrid width="full" {...props}>
    {children}
  </ChakraSimpleGrid>
);
