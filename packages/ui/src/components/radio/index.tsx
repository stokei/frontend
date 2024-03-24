import {
  forwardRef,
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
} from "@chakra-ui/react";

export interface RadioProps extends ChakraRadioProps {
  readonly id: string;
  readonly ref?: any;
}

export const Radio = forwardRef((props: RadioProps, ref) => (
  <ChakraRadio
    focusBorderColor="primary.500"
    colorScheme="primary"
    {...props}
    ref={ref}
    errorBorderColor="error.500"
  />
));
