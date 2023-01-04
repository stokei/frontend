import { PropsWithChildren } from "react";
import { InputRightElement as ChakraInputRightElement } from "@chakra-ui/react";

export interface InputRightElementProps {}
export const InputRightElement: React.FC<
  PropsWithChildren<InputRightElementProps>
> = ({ ...props }) => <ChakraInputRightElement {...props} />;
