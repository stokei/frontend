import {
  Highlight as ChakraHighlight,
  HighlightProps as ChakraHighlightProps,
} from "@chakra-ui/react";

export interface HighlightProps extends ChakraHighlightProps {}

export const Highlight: React.FC<HighlightProps> = ({ ...props }) => (
  <ChakraHighlight
    styles={{ color: "primary.500", whiteSpace: "wrap" }}
    {...props}
  />
);
