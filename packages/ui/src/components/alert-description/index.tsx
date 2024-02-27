import {
  AlertDescription as ChakraAlertDescription,
  AlertDescriptionProps as ChakraAlertDescriptionProps,
} from "@chakra-ui/react";

export interface AlertDescriptionProps extends ChakraAlertDescriptionProps {}
export const AlertDescription = ({
  children,
  ...props
}: AlertDescriptionProps) => (
  <ChakraAlertDescription {...props}>{children}</ChakraAlertDescription>
);
