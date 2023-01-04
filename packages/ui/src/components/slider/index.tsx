import {
  Slider as ChakraSlider,
  SliderProps as ChakraSliderProps,
} from "@chakra-ui/react";

export interface SliderProps extends ChakraSliderProps {}
export const Slider: React.FC<SliderProps> = ({ children, ...props }) => (
  <ChakraSlider {...props}>{children}</ChakraSlider>
);
