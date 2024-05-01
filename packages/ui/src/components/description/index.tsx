import { Text, TextProps } from "@chakra-ui/react";

export interface DescriptionProps extends TextProps {}

export const Description = ({ children, ...props }: DescriptionProps) => {
  return (
    <Text wordBreak="break-word" fontSize="sm" color="text.400" {...props}>
      {children}
    </Text>
  );
};
