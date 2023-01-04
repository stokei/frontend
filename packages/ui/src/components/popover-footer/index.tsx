import {
  PopoverFooter as ChakraPopoverFooter,
  PopoverFooterProps as ChakraPopoverFooterProps,
} from "@chakra-ui/react";

export interface PopoverFooterProps extends ChakraPopoverFooterProps {}
export const PopoverFooter: React.FC<PopoverFooterProps> = ({
  children,
  ...props
}) => <ChakraPopoverFooter {...props}>{children}</ChakraPopoverFooter>;
