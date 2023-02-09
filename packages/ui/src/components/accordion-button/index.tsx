import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
} from "@chakra-ui/react";

export interface AccordionButtonProps extends ChakraAccordionButtonProps {}

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  children,
  ...props
}) => (
  <ChakraAccordionButton
    background="background.100"
    paddingY="3"
    paddingX="4"
    {...props}
  >
    {children}
  </ChakraAccordionButton>
);
