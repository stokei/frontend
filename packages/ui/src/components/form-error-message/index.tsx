import {
  FormErrorMessage as ChakraFormErrorMessage,
  FormErrorMessageProps as ChakraFormErrorMessageProps,
} from "@chakra-ui/react";

export interface FormErrorMessageProps extends ChakraFormErrorMessageProps {}

export const FormErrorMessage = ({
  children,
  ...props
}: FormErrorMessageProps) => {
  return <ChakraFormErrorMessage {...props}>{children}</ChakraFormErrorMessage>;
};
