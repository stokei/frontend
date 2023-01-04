import { AccordionIcon as ChakraAccordionIcon } from "@chakra-ui/react";

export interface AccordionIconProps {}

export const AccordionIcon: React.FC<AccordionIconProps> = ({ ...props }) => (
  <ChakraAccordionIcon {...props} />
);
