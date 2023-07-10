import {
  SkeletonCircle as ChakraSkeletonCircle,
  SkeletonProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface SkeletonCircleProps extends SkeletonProps {}

export const SkeletonCircle: React.FC<
  PropsWithChildren<SkeletonCircleProps>
> = ({ children, ...props }) => (
  <ChakraSkeletonCircle {...props}>{children}</ChakraSkeletonCircle>
);
