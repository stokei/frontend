import {
  Fade as ChakraFade,
  FadeProps as ChakraFadeProps,
} from "@chakra-ui/react";

export interface FadeTransitionProps extends ChakraFadeProps {}
export const FadeTransition = ({ children, ...props }: FadeTransitionProps) => (
  <ChakraFade {...props}>{children}</ChakraFade>
);
