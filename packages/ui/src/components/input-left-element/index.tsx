import { PropsWithChildren } from "react";
import {
  InputLeftElement as ChakraInputLeftElement,
  InputElementProps as ChakraInputElementProps,
} from "@chakra-ui/react";

export interface InputLeftElementProps extends ChakraInputElementProps {}
export const InputLeftElement = ({
  ...props
}: PropsWithChildren<InputLeftElementProps>) => (
  <ChakraInputLeftElement {...props} />
);
