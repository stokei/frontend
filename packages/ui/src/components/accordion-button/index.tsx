import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
} from "@chakra-ui/react";

export interface AccordionButtonProps extends ChakraAccordionButtonProps {}

export const AccordionButton = ({
  children,
  ...props
}: AccordionButtonProps) => (
  <ChakraAccordionButton
    background="background.200"
    paddingY="3"
    paddingX="4"
    {...props}
  >
    {children}
  </ChakraAccordionButton>
);
