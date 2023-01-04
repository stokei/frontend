import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";

export interface ImageProps extends ChakraImageProps {}

export const Image: React.FC<ImageProps> = ({ ...props }) => (
  <ChakraImage {...props} />
);
