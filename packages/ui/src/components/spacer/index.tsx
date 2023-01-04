import {
  Spacer as ChakraSpacer,
  SpacerProps as ChakraSpacerProps,
} from "@chakra-ui/react";

export interface SpacerProps extends ChakraSpacerProps {}

export const Spacer: React.FC<SpacerProps> = ({ children, ...props }) => (
  <ChakraSpacer {...props}>{children}</ChakraSpacer>
);
