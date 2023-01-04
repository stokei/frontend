import {
  AspectRatio as ChakraAspectRatio,
  AspectRatioProps as ChakraAspectRatioProps,
  forwardRef,
} from "@chakra-ui/react";

export interface AspectRatioProps extends ChakraAspectRatioProps {
  readonly ref?: any;
}
export const AspectRatio: React.FC<AspectRatioProps> = forwardRef<
  AspectRatioProps,
  "div"
>(({ children, ...props }, ref) => (
  <ChakraAspectRatio ref={ref} {...props}>
    {children}
  </ChakraAspectRatio>
));
