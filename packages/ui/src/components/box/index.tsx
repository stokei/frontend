import {
  Flex as ChakraFlex,
  FlexProps as ChakraFlexProps,
  forwardRef,
} from "@chakra-ui/react";

export interface BoxProps extends ChakraFlexProps {
  readonly ref?: any;
}
export const Box: React.FC<BoxProps> = forwardRef<BoxProps, "div">(
  ({ children, ...props }, ref) => (
    <ChakraFlex flexDirection="row" height="fit-content" ref={ref} {...props}>
      {children}
    </ChakraFlex>
  )
);
