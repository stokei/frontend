import {
  forwardRef,
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
} from "@chakra-ui/react";

export interface SwitchProps extends ChakraSwitchProps {
  readonly ref?: any;
}
export const Switch: React.FC<SwitchProps> = forwardRef(
  ({ children, ...props }, ref) => (
    <ChakraSwitch colorScheme="primary" ref={ref} {...props}>
      {children}
    </ChakraSwitch>
  )
);
