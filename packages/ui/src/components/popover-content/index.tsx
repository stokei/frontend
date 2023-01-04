import {
  PopoverContent as ChakraPopoverContent,
  PopoverContentProps as ChakraPopoverContentProps,
} from "@chakra-ui/react";

export interface PopoverContentProps extends ChakraPopoverContentProps {}
export const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  ...props
}) => <ChakraPopoverContent {...props}>{children}</ChakraPopoverContent>;
