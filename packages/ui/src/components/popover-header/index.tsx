import {
  PopoverHeader as ChakraPopoverHeader,
  PopoverHeaderProps as ChakraPopoverHeaderProps,
} from "@chakra-ui/react";

export interface PopoverHeaderProps extends ChakraPopoverHeaderProps {}
export const PopoverHeader = ({ children, ...props }: PopoverHeaderProps) => (
  <ChakraPopoverHeader {...props}>{children}</ChakraPopoverHeader>
);
