import { Box, BoxProps } from "../box";
import { Text } from "../text";

export interface AccordionLabelProps extends BoxProps {}

export const AccordionLabel: React.FC<AccordionLabelProps> = ({
  children,
  ...props
}) => (
  <Box as="span" flex="1" textAlign="left" fontWeight="bold" {...props}>
    <Text>{children}</Text>
  </Box>
);
