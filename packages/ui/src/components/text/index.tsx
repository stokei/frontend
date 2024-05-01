import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
  forwardRef,
} from "@chakra-ui/react";

export interface TextProps extends ChakraTextProps {}

export const Text = forwardRef(
  ({ children, isTruncated, ...props }: TextProps, ref) => {
    return (
      <ChakraText
        display={!isTruncated ? "inline-flex" : "inline-block"}
        isTruncated={isTruncated}
        color="text.500"
        {...props}
        ref={ref}
      >
        {children}
      </ChakraText>
    );
  }
);
