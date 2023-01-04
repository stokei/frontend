import {
  PopoverCloseButton as ChakraPopoverCloseButton,
  PopoverCloseButtonProps as ChakraPopoverCloseButtonProps,
} from "@chakra-ui/react";

export interface PopoverCloseButtonProps
  extends ChakraPopoverCloseButtonProps {}
export const PopoverCloseButton: React.FC<PopoverCloseButtonProps> = ({
  children,
  ...props
}) => (
  <ChakraPopoverCloseButton {...props}>{children}</ChakraPopoverCloseButton>
);
