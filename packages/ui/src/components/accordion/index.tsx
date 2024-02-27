import {
  Accordion as ChakraAccordion,
  AccordionProps as ChakraAccordionProps,
} from "@chakra-ui/react";

export interface AccordionProps extends ChakraAccordionProps {}
export const Accordion = ({ children, ...props }: AccordionProps) => (
  <ChakraAccordion allowToggle rounded="lg" {...props}>
    {children}
  </ChakraAccordion>
);
