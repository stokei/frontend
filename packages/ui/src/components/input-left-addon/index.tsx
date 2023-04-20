import { PropsWithChildren } from "react";
import {
  InputLeftAddon as ChakraInputLeftAddon,
  InputAddonProps as ChakraInputAddonProps,
} from "@chakra-ui/react";

export interface InputLeftAddonProps extends ChakraInputAddonProps {}
export const InputLeftAddon: React.FC<
  PropsWithChildren<InputLeftAddonProps>
> = ({ ...props }) => <ChakraInputLeftAddon {...props} />;
