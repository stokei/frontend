import { Tag as ChakraTag, TagProps as ChakraTagProps } from "@chakra-ui/react";

export interface TagProps extends ChakraTagProps {}
export const Tag: React.FC<TagProps> = ({ children, ...props }) => (
  <ChakraTag colorScheme="primary" variant="subtle" {...props}>
    {children}
  </ChakraTag>
);
