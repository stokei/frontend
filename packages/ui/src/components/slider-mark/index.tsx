import {
  SliderMark as ChakraSliderMark,
  SliderMarkProps as ChakraSliderMarkProps,
} from "@chakra-ui/react";

export interface SliderMarkProps extends ChakraSliderMarkProps {}
export const SliderMark: React.FC<SliderMarkProps> = ({
  children,
  ...props
}) => <ChakraSliderMark {...props}>{children}</ChakraSliderMark>;
