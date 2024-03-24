import { PropsWithChildren } from "react";
import {
  InputRightAddon as ChakraInputRightAddon,
  InputAddonProps as ChakraInputAddonProps,
} from "@chakra-ui/react";

export interface InputRightAddonProps extends ChakraInputAddonProps {}
export const InputRightAddon = ({
  ...props
}: PropsWithChildren<InputRightAddonProps>) => (
  <ChakraInputRightAddon {...props} />
);
