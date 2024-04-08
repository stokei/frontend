import {
  Editable as ChakraEditable,
  EditableProps as ChakraEditableProps,
} from "@chakra-ui/react";
import { InputGroup } from "../input-group";

export type EditableProps = ChakraEditableProps;
export const Editable = ({ children, ...props }: EditableProps) => {
  return (
    <ChakraEditable
      width="fit-content"
      colorScheme="primary"
      isPreviewFocusable={false}
      selectAllOnFocus={false}
      submitOnBlur={false}
      flexDirection="row"
      {...props}
    >
      <InputGroup>
        <>{children}</>
      </InputGroup>
    </ChakraEditable>
  );
};
