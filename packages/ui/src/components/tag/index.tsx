import { Tag as ChakraTag, TagProps as ChakraTagProps } from "@chakra-ui/react";

export interface TagProps extends ChakraTagProps {}
export const Tag: React.FC<TagProps> = ({ children, ...props }) => (
  <ChakraTag rounded="full" paddingX="3" paddingY="2" {...props}>
    {children}
  </ChakraTag>
);
