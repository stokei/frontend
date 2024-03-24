import { Text, TextProps } from "../text";

export interface AccordionLabelProps extends TextProps {}

export const AccordionLabel = ({ children, ...props }: AccordionLabelProps) => (
  <Text flex="1" textAlign="left" fontWeight="bold" {...props}>
    {children}
  </Text>
);
