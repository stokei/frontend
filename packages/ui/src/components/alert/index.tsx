import {
  Alert as ChakraAlert,
  AlertProps as ChakraAlertProps,
} from "@chakra-ui/react";

export interface AlertProps extends ChakraAlertProps {}
export const Alert = ({ children, ...props }: AlertProps) => (
  <ChakraAlert rounded="md" {...props}>
    {children}
  </ChakraAlert>
);
