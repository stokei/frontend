import React from "react";
import {
  CardHeader as ChakraCardHeader,
  CardHeaderProps as ChakraCardHeaderProps,
} from "@chakra-ui/react";

export interface CardHeaderProps extends ChakraCardHeaderProps {}
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  ...props
}) => {
  return <ChakraCardHeader {...props}>{children}</ChakraCardHeader>;
};
