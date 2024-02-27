import {
  SliderMark as ChakraSliderMark,
  SliderMarkProps as ChakraSliderMarkProps,
} from "@chakra-ui/react";

export interface SliderMarkProps extends ChakraSliderMarkProps {}
export const SliderMark = ({ children, ...props }: SliderMarkProps) => (
  <ChakraSliderMark {...props}>{children}</ChakraSliderMark>
);
