import {
  Slide as ChakraSlide,
  SlideProps as ChakraSlideProps,
} from "@chakra-ui/react";

export interface SlideTransitionProps extends ChakraSlideProps {}
export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  ...props
}) => <ChakraSlide {...props}>{children}</ChakraSlide>;
