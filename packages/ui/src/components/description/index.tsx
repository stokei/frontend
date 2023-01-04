import { Text, TextProps } from "@chakra-ui/react";

export interface DescriptionProps extends TextProps {}

export const Description: React.FC<DescriptionProps> = ({
  children,
  ...props
}) => {
  return (
    <Text fontSize="xs" color="text.400" {...props}>
      {children}
    </Text>
  );
};
