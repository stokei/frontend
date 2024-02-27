import {
  PopoverCloseButton as ChakraPopoverCloseButton,
  PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
} from "@chakra-ui/react";

export interface PopoverCloseButtonProps
  extends ChakraPopoverCloseButtonProps {}
export const PopoverCloseButton = ({
  children,
  ...props
}: PopoverCloseButtonProps) => (
  <ChakraPopoverCloseButton {...props}>{children}</ChakraPopoverCloseButton>
);
