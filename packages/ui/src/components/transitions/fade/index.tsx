import {
  Fade as ChakraFade,
  FadeProps as ChakraFadeProps,
} from "@chakra-ui/react";

export interface FadeTransitionProps extends ChakraFadeProps {}
export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  ...props
}) => <ChakraFade {...props}>{children}</ChakraFade>;
