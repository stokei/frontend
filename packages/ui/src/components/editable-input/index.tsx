import { EditableInput as ChakraEditableInput } from "@chakra-ui/react";
import { Input, InputProps } from "../input";

export interface EditableInputProps extends InputProps {}
export const EditableInput = ({ children, ...props }: EditableInputProps) => {
  return (
    <Input as={ChakraEditableInput} {...props}>
      {children}
    </Input>
  );
};
