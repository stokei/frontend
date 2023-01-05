import { PropsWithChildren } from "react";
import {
  InputLeftElement as ChakraInputLeftElement,
  InputElementProps as ChakraInputElementProps,
} from "@chakra-ui/react";

export interface InputLeftElementProps extends ChakraInputElementProps {}
export const InputLeftElement: React.FC<
  PropsWithChildren<InputLeftElementProps>
> = ({ ...props }) => <ChakraInputLeftElement {...props} />;
