import {
  PopoverBody as ChakraPopoverBody,
  PopoverBodyProps as ChakraPopoverBodyProps,
} from "@chakra-ui/react";

export interface PopoverBodyProps extends ChakraPopoverBodyProps {}
export const PopoverBody: React.FC<PopoverBodyProps> = ({
  children,
  ...props
}) => <ChakraPopoverBody {...props}>{children}</ChakraPopoverBody>;
