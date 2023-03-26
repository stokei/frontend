import { PopoverAnchor as ChakraPopoverAnchor } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface PopoverAnchorProps {}
export const PopoverAnchor: React.FC<PropsWithChildren<PopoverAnchorProps>> = ({
  children,
  ...props
}) => <ChakraPopoverAnchor {...props}>{children}</ChakraPopoverAnchor>;
