import { PopoverAnchor as ChakraPopoverAnchor } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface PopoverAnchorProps {}
export const PopoverAnchor = ({
  children,
  ...props
}: PropsWithChildren<PopoverAnchorProps>) => (
  <ChakraPopoverAnchor {...props}>{children}</ChakraPopoverAnchor>
);
