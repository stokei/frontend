import React from "react";
import {
  Card as ChakraCard,
  CardProps as ChakraCardProps,
} from "@chakra-ui/react";

export interface CardProps extends ChakraCardProps {}
export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <ChakraCard width="full" variant="outline" size="md" {...props}>
      {children}
    </ChakraCard>
  );
};
