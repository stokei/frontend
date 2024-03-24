import React from "react";
import {
  CardFooter as ChakraCardFooter,
  CardFooterProps as ChakraCardFooterProps,
} from "@chakra-ui/react";

export interface CardFooterProps extends ChakraCardFooterProps {}
export const CardFooter = ({ children, ...props }: CardFooterProps) => {
  return <ChakraCardFooter {...props}>{children}</ChakraCardFooter>;
};
