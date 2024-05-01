import { FormHelperText as ChakraFormHelperText } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface FormHelperTextProps {}

export const FormHelperText = ({
  children,
  ...props
}: PropsWithChildren<FormHelperTextProps>) => {
  return <ChakraFormHelperText {...props}>{children}</ChakraFormHelperText>;
};
