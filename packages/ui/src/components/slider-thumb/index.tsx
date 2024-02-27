import {
  forwardRef,
  SliderThumb as ChakraSliderThumb,
  SliderThumbProps as ChakraSliderThumbProps,
} from "@chakra-ui/react";

export interface SliderThumbProps extends ChakraSliderThumbProps {}
export const SliderThumb = forwardRef(
  ({ children, ...props }: SliderThumbProps, ref) => (
    <ChakraSliderThumb {...props} ref={ref}>
      {children}
    </ChakraSliderThumb>
  )
);
