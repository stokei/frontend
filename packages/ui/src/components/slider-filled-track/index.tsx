import { SliderFilledTrack as ChakraSliderFilledTrack } from "@chakra-ui/react";

export interface SliderFilledTrackProps {}
export const SliderFilledTrack = ({ ...props }: SliderFilledTrackProps) => (
  <ChakraSliderFilledTrack {...props} />
);
