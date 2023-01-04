import {
  TagCloseButton as ChakraTagCloseButton,
  TagCloseButtonProps as ChakraTagCloseButtonProps,
} from "@chakra-ui/react";

export interface TagCloseButtonProps extends ChakraTagCloseButtonProps {}
export const TagCloseButton: React.FC<TagCloseButtonProps> = ({
  children,
  ...props
}) => <ChakraTagCloseButton {...props}>{children}</ChakraTagCloseButton>;
