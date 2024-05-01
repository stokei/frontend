import {
  SkeletonCircle as ChakraSkeletonCircle,
  SkeletonProps,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface SkeletonCircleProps extends SkeletonProps {}

export const SkeletonCircle = ({
  children,
  ...props
}: PropsWithChildren<SkeletonCircleProps>) => (
  <ChakraSkeletonCircle {...props}>{children}</ChakraSkeletonCircle>
);
