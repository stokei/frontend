import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";

export interface TextProps extends ChakraTextProps {}

export const Text = ({ children, ...props }: TextProps) => {
  return (
    <ChakraText display="inline-flex" color="text.500" {...props}>
      {children}
    </ChakraText>
  );
};
