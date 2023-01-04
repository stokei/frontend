import {
  Skeleton as ChakraSkeleton,
  SkeletonProps as ChakraSkeletonProps,
} from "@chakra-ui/react";

export interface SkeletonProps extends ChakraSkeletonProps {}
export const Skeleton: React.FC<SkeletonProps> = ({ children, ...props }) => (
  <ChakraSkeleton {...props}>{children}</ChakraSkeleton>
);
