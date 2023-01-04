import {
  PopoverHeader as ChakraPopoverHeader,
  PopoverHeaderProps as ChakraPopoverHeaderProps,
} from "@chakra-ui/react";

export interface PopoverHeaderProps extends ChakraPopoverHeaderProps {}
export const PopoverHeader: React.FC<PopoverHeaderProps> = ({
  children,
  ...props
}) => <ChakraPopoverHeader {...props}>{children}</ChakraPopoverHeader>;
