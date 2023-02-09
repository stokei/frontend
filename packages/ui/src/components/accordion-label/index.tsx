import { Text, TextProps } from "../text";

export interface AccordionLabelProps extends TextProps {}

export const AccordionLabel: React.FC<AccordionLabelProps> = ({
  children,
  ...props
}) => (
  <Text flex="1" textAlign="left" fontWeight="bold" {...props}>
    {children}
  </Text>
);
