import {
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
} from "@chakra-ui/react";

export interface AccordionItemProps extends ChakraAccordionItemProps {}

export const AccordionItem = ({ children, ...props }: AccordionItemProps) => (
  <ChakraAccordionItem borderWidth="thin" {...props}>
    {children}
  </ChakraAccordionItem>
);
