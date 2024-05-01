import { AccordionIcon as ChakraAccordionIcon } from "@chakra-ui/react";

export interface AccordionIconProps {}

export const AccordionIcon = ({ ...props }: AccordionIconProps) => (
  <ChakraAccordionIcon {...props} />
);
