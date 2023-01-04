import { PropsWithChildren } from "react";
import { InputLeftElement as ChakraInputLeftElement } from "@chakra-ui/react";

export interface InputLeftElementProps {}
export const InputLeftElement: React.FC<
  PropsWithChildren<InputLeftElementProps>
> = ({ ...props }) => <ChakraInputLeftElement {...props} />;
