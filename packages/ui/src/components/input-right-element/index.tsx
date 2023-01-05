import { PropsWithChildren } from "react";
import {
  InputRightElement as ChakraInputRightElement,
  InputElementProps as ChakraInputElementProps,
} from "@chakra-ui/react";

export interface InputRightElementProps extends ChakraInputElementProps {}
export const InputRightElement: React.FC<
  PropsWithChildren<InputRightElementProps>
> = ({ ...props }) => <ChakraInputRightElement {...props} />;
