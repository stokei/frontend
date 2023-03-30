import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps,
} from "@chakra-ui/react";

export interface LabelProps extends ChakraFormLabelProps {}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <ChakraFormLabel width="full" fontSize="sm" color="text.500" {...props}>
      {children}
    </ChakraFormLabel>
  );
};
