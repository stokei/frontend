import {
  AccordionPanel as ChakraAccordionPanel,
  AccordionPanelProps as ChakraAccordionPanelProps,
} from "@chakra-ui/react";

export interface AccordionPanelProps extends ChakraAccordionPanelProps {}

export const AccordionPanel = ({ children, ...props }: AccordionPanelProps) => (
  <ChakraAccordionPanel
    borderTopWidth="thin"
    padding="4"
    background="background.50"
    {...props}
  >
    {children}
  </ChakraAccordionPanel>
);
