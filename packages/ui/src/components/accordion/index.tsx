import {
  Accordion as ChakraAccordion,
  AccordionProps as ChakraAccordionProps,
} from "@chakra-ui/react";

export interface AccordionProps extends ChakraAccordionProps {}
export const Accordion: React.FC<AccordionProps> = ({ children, ...props }) => (
  <ChakraAccordion {...props}>{children}</ChakraAccordion>
);
