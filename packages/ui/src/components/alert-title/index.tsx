import {
  AlertTitle as ChakraAlertTitle,
  AlertTitleProps as ChakraAlertTitleProps,
} from "@chakra-ui/react";

export interface AlertTitleProps extends ChakraAlertTitleProps {}
export const AlertTitle = ({ children, ...props }: AlertTitleProps) => (
  <ChakraAlertTitle {...props}>{children}</ChakraAlertTitle>
);
