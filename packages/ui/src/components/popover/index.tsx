import {
  Popover as ChakraPopover,
  PopoverProps as ChakraPopoverProps,
} from "@chakra-ui/react";

export interface PopoverProps extends ChakraPopoverProps {}
export const Popover = ({ children, ...props }: PopoverProps) => (
  <ChakraPopover colorScheme="primary" variant="subtle" {...props}>
    {children}
  </ChakraPopover>
);
