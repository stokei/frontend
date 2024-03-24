import {
  Spacer as ChakraSpacer,
  SpacerProps as ChakraSpacerProps,
} from "@chakra-ui/react";

export interface SpacerProps extends ChakraSpacerProps {}

export const Spacer = ({ children, ...props }: SpacerProps) => (
  <ChakraSpacer {...props}>{children}</ChakraSpacer>
);
