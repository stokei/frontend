import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
} from "@chakra-ui/react";

export interface AccordionButtonProps extends ChakraAccordionButtonProps {}

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  ...props
}) => (
  <ChakraAccordionButton colorScheme="primary" {...props}>
    {children}
  </ChakraAccordionButton>
);
