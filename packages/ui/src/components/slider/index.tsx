import {
  Slider as ChakraSlider,
  SliderProps as ChakraSliderProps,
} from "@chakra-ui/react";

export interface SliderProps extends ChakraSliderProps {}
export const Slider = ({ children, ...props }: SliderProps) => (
  <ChakraSlider {...props}>{children}</ChakraSlider>
);
