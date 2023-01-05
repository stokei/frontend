import React from "react";
import {
  CardFooter as ChakraCardFooter,
  CardFooterProps as ChakraCardFooterProps,
} from "@chakra-ui/react";

export interface CardFooterProps extends ChakraCardFooterProps {}
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  ...props
}) => {
  return <ChakraCardFooter {...props}>{children}</ChakraCardFooter>;
};
