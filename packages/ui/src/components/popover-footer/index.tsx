import {
  PopoverFooter as ChakraPopoverFooter,
  PopoverFooterProps as ChakraPopoverFooterProps,
} from "@chakra-ui/react";

export interface PopoverFooterProps extends ChakraPopoverFooterProps {}
export const PopoverFooter = ({ children, ...props }: PopoverFooterProps) => (
  <ChakraPopoverFooter {...props}>{children}</ChakraPopoverFooter>
);
