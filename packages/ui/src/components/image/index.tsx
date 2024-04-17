import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import { Loading } from "../loading";

export interface ImageProps extends ChakraImageProps {
  isLoading?: boolean;
}

export const Image = ({ isLoading, ...props }: ImageProps) => {
  if (isLoading) {
    return <Loading />
  }
  return (
    <ChakraImage
      width="full"
      height="auto"
      objectFit="contain"
      objectPosition="center"
      {...props}
    />
  );
}