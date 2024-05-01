import {
  forwardRef,
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
} from "@chakra-ui/react";

export interface SwitchProps extends ChakraSwitchProps {
  readonly ref?: any;
}
export const Switch = forwardRef(({ children, ...props }: SwitchProps, ref) => (
  <ChakraSwitch colorScheme="primary" ref={ref} {...props}>
    {children}
  </ChakraSwitch>
));
