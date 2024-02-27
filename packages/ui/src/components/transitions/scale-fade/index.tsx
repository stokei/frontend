import {
  ScaleFade as ChakraScaleFade,
  ScaleFadeProps as ChakraScaleFadeProps,
} from "@chakra-ui/react";

export interface ScaleFadeTransitionProps extends ChakraScaleFadeProps {}
export const ScaleFadeTransition = ({
  children,
  ...props
}: ScaleFadeTransitionProps) => (
  <ChakraScaleFade initialScale={0.9} {...props}>
    {children}
  </ChakraScaleFade>
);
