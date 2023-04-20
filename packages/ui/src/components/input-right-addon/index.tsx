import { PropsWithChildren } from "react";
import {
  InputRightAddon as ChakraInputRightAddon,
  InputAddonProps as ChakraInputAddonProps,
} from "@chakra-ui/react";

export interface InputRightAddonProps extends ChakraInputAddonProps {}
export const InputRightAddon: React.FC<
  PropsWithChildren<InputRightAddonProps>
> = ({ ...props }) => <ChakraInputRightAddon {...props} />;
