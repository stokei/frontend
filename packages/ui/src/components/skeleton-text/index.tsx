import {
  SkeletonText as ChakraSkeletonText,
  SkeletonTextProps as ChakraSkeletonTextProps,
} from "@chakra-ui/react";

export interface SkeletonTextProps extends ChakraSkeletonTextProps {}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  children,
  ...props
}) => <ChakraSkeletonText {...props}>{children}</ChakraSkeletonText>;
