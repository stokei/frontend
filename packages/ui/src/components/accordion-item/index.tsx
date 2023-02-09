import {
  AccordionItem as ChakraAccordionItem,
  AccordionItemProps as ChakraAccordionItemProps,
} from "@chakra-ui/react";

export interface AccordionItemProps extends ChakraAccordionItemProps {}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  ...props
}) => (
  <ChakraAccordionItem borderWidth="thin" {...props}>
    {children}
  </ChakraAccordionItem>
);
