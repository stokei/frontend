import {
  Skeleton as ChakraSkeleton,
  SkeletonProps as ChakraSkeletonProps,
} from "@chakra-ui/react";

export interface SkeletonProps extends ChakraSkeletonProps {}
export const Skeleton = ({ children, ...props }: SkeletonProps) => (
  <ChakraSkeleton {...props}>{children}</ChakraSkeleton>
);
