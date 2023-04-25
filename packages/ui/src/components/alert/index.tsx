import {
  Alert as ChakraAlert,
  AlertProps as ChakraAlertProps,
} from "@chakra-ui/react";

export interface AlertProps extends ChakraAlertProps {}
export const Alert: React.FC<AlertProps> = ({ children, ...props }) => (
  <ChakraAlert {...props}>{children}</ChakraAlert>
);
