import { FormHelperText as ChakraFormHelperText } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export interface FormHelperTextProps {}

export const FormHelperText: React.FC<
  PropsWithChildren<FormHelperTextProps>
> = ({ children, ...props }) => {
  return <ChakraFormHelperText {...props}>{children}</ChakraFormHelperText>;
};
