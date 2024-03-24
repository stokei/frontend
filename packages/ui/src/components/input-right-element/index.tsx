import { PropsWithChildren } from "react";
import {
  InputRightElement as ChakraInputRightElement,
  InputElementProps as ChakraInputElementProps,
} from "@chakra-ui/react";

export interface InputRightElementProps extends ChakraInputElementProps {}
export const InputRightElement = ({
  ...props
}: PropsWithChildren<InputRightElementProps>) => (
  <ChakraInputRightElement {...props} />
);
