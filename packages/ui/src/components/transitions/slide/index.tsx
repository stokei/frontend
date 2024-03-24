import {
  Slide as ChakraSlide,
  SlideProps as ChakraSlideProps,
} from "@chakra-ui/react";

export interface SlideTransitionProps extends ChakraSlideProps {}
export const SlideTransition = ({
  children,
  ...props
}: SlideTransitionProps) => <ChakraSlide {...props}>{children}</ChakraSlide>;
