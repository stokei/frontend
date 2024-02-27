import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";

export interface ImageProps extends ChakraImageProps {}

export const Image = ({ ...props }: ImageProps) => (
  <ChakraImage
    width="full"
    height="auto"
    objectFit="contain"
    objectPosition="center"
    {...props}
  />
);
