import {
  PopoverBody as ChakraPopoverBody,
  PopoverBodyProps as ChakraPopoverBodyProps,
} from "@chakra-ui/react";

export interface PopoverBodyProps extends ChakraPopoverBodyProps {}
export const PopoverBody = ({ children, ...props }: PopoverBodyProps) => (
  <ChakraPopoverBody {...props}>{children}</ChakraPopoverBody>
);
