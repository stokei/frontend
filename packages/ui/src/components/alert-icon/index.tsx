import {
  AlertIcon as ChakraAlertIcon,
  AlertIconProps as ChakraAlertIconProps,
} from "@chakra-ui/react";

export interface AlertIconProps extends ChakraAlertIconProps {}
export const AlertIcon = ({ children, ...props }: AlertIconProps) => (
  <ChakraAlertIcon {...props}>{children}</ChakraAlertIcon>
);
