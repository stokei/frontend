import React from "react";
import {
  CardBody as ChakraCardBody,
  CardBodyProps as ChakraCardBodyProps,
} from "@chakra-ui/react";

export interface CardBodyProps extends ChakraCardBodyProps {}
export const CardBody = ({ children, ...props }: CardBodyProps) => {
  return <ChakraCardBody {...props}>{children}</ChakraCardBody>;
};
