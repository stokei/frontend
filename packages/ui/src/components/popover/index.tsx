import {
  Popover as ChakraPopover,
  PopoverProps as ChakraPopoverProps,
} from "@chakra-ui/react";

export interface PopoverProps extends ChakraPopoverProps {}
export const Popover: React.FC<PopoverProps> = ({ children, ...props }) => (
  <ChakraPopover colorScheme="primary" variant="subtle" {...props}>
    {children}
  </ChakraPopover>
);
