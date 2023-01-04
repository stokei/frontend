import {
  FormErrorMessage as ChakraFormErrorMessage,
  FormErrorMessageProps as ChakraFormErrorMessageProps,
} from "@chakra-ui/react";

export interface FormErrorMessageProps extends ChakraFormErrorMessageProps {}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({
  children,
  ...props
}) => {
  return <ChakraFormErrorMessage {...props}>{children}</ChakraFormErrorMessage>;
};
