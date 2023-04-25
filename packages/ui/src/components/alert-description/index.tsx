import {
  AlertDescription as ChakraAlertDescription,
  AlertDescriptionProps as ChakraAlertDescriptionProps,
} from "@chakra-ui/react";

export interface AlertDescriptionProps extends ChakraAlertDescriptionProps {}
export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  ...props
}) => <ChakraAlertDescription {...props}>{children}</ChakraAlertDescription>;
