import {
  SliderTrack as ChakraSliderTrack,
  SliderTrackProps as ChakraSliderTrackProps,
} from "@chakra-ui/react";

export interface SliderTrackProps extends ChakraSliderTrackProps {}
export const SliderTrack: React.FC<SliderTrackProps> = ({
  children,
  ...props
}) => <ChakraSliderTrack {...props}>{children}</ChakraSliderTrack>;
