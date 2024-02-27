import {
  SliderTrack as ChakraSliderTrack,
  SliderTrackProps as ChakraSliderTrackProps,
} from "@chakra-ui/react";

export interface SliderTrackProps extends ChakraSliderTrackProps {}
export const SliderTrack = ({ children, ...props }: SliderTrackProps) => (
  <ChakraSliderTrack {...props}>{children}</ChakraSliderTrack>
);
