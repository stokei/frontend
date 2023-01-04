import { SkeletonCircle as ChakraSkeletonCircle } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface SkeletonCircleProps {}

export const SkeletonCircle: React.FC<
  PropsWithChildren<SkeletonCircleProps>
> = ({ children, ...props }) => (
  <ChakraSkeletonCircle {...props}>{children}</ChakraSkeletonCircle>
);
