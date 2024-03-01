import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";

export interface TextProps extends ChakraTextProps {}

export const Text = ({ children, isTruncated, ...props }: TextProps) => {
  return (
    <ChakraText
      display={!isTruncated ? "inline-flex" : "inline-block"}
      isTruncated={isTruncated}
      color="text.500"
      {...props}
    >
      {children}
    </ChakraText>
  );
};
