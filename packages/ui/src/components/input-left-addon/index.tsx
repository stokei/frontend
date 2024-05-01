import { PropsWithChildren } from "react";
import {
  InputLeftAddon as ChakraInputLeftAddon,
  InputAddonProps as ChakraInputAddonProps,
} from "@chakra-ui/react";

export interface InputLeftAddonProps extends ChakraInputAddonProps {}
export const InputLeftAddon = ({
  ...props
}: PropsWithChildren<InputLeftAddonProps>) => (
  <ChakraInputLeftAddon {...props} />
);
