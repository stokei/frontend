import {
  EditablePreview as ChakraEditablePreview,
  EditablePreviewProps as ChakraEditablePreviewProps,
} from "@chakra-ui/react";
import { Text } from "../text";

export interface EditablePreviewProps extends ChakraEditablePreviewProps {}
export const EditablePreview = (props: EditablePreviewProps) => {
  return <ChakraEditablePreview as={Text} {...props} />;
};
