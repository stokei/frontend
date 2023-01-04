import { SliderFilledTrack as ChakraSliderFilledTrack } from "@chakra-ui/react";

export interface SliderFilledTrackProps {}
export const SliderFilledTrack: React.FC<SliderFilledTrackProps> = ({
  ...props
}) => <ChakraSliderFilledTrack {...props} />;
