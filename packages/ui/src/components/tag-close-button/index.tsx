import {
  TagCloseButton as ChakraTagCloseButton,
  TagCloseButtonProps as ChakraTagCloseButtonProps,
} from "@chakra-ui/react";

export interface TagCloseButtonProps extends ChakraTagCloseButtonProps {}
export const TagCloseButton = ({ children, ...props }: TagCloseButtonProps) => (
  <ChakraTagCloseButton {...props}>{children}</ChakraTagCloseButton>
);
