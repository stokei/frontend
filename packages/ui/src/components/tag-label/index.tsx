import {
  TagLabel as ChakraTagLabel,
  TagLabelProps as ChakraTagLabelProps,
} from "@chakra-ui/react";

export interface TagLabelProps extends ChakraTagLabelProps {}
export const TagLabel = ({ children, ...props }: TagLabelProps) => (
  <ChakraTagLabel {...props}>{children}</ChakraTagLabel>
);
