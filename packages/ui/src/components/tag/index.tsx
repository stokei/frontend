import { Tag as ChakraTag, TagProps as ChakraTagProps } from "@chakra-ui/react";

export interface TagProps extends ChakraTagProps {}
export const Tag: React.FC<TagProps> = ({ children, ...props }) => (
  <ChakraTag rounded="full" {...props}>
    {children}
  </ChakraTag>
);
