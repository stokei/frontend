import {
  forwardRef,
  SliderThumb as ChakraSliderThumb,
  SliderThumbProps as ChakraSliderThumbProps,
} from "@chakra-ui/react";

export interface SliderThumbProps extends ChakraSliderThumbProps {}
export const SliderThumb: React.FC<SliderThumbProps> = forwardRef(
  ({ children, ...props }, ref) => (
    <ChakraSliderThumb {...props} ref={ref}>
      {children}
    </ChakraSliderThumb>
  )
);
