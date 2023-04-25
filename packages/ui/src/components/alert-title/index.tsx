import {
  AlertTitle as ChakraAlertTitle,
  AlertTitleProps as ChakraAlertTitleProps,
} from "@chakra-ui/react";

export interface AlertTitleProps extends ChakraAlertTitleProps {}
export const AlertTitle: React.FC<AlertTitleProps> = ({
  children,
  ...props
}) => <ChakraAlertTitle {...props}>{children}</ChakraAlertTitle>;
