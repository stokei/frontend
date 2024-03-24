import {
  SkeletonText as ChakraSkeletonText,
  SkeletonTextProps as ChakraSkeletonTextProps,
} from "@chakra-ui/react";

export interface SkeletonTextProps extends ChakraSkeletonTextProps {}

export const SkeletonText = ({ children, ...props }: SkeletonTextProps) => (
  <ChakraSkeletonText {...props}>{children}</ChakraSkeletonText>
);
