import {
  AlertIcon as ChakraAlertIcon,
  AlertIconProps as ChakraAlertIconProps,
} from "@chakra-ui/react";

export interface AlertIconProps extends ChakraAlertIconProps {}
export const AlertIcon: React.FC<AlertIconProps> = ({ children, ...props }) => (
  <ChakraAlertIcon {...props}>{children}</ChakraAlertIcon>
);
