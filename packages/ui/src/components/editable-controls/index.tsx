import { useEditableControls } from "@chakra-ui/react";
import { Box } from "../box";
import { ButtonGroup } from "../button-group";
import { IconButton } from "../icon-button";
import { InputRightElement } from "../input-right-element";

export interface EditableControlsProps {}
export const EditableControls = ({ ...props }: EditableControlsProps) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <InputRightElement width="fit-content">
      <ButtonGroup
        justifyContent="center"
        size="sm"
        variant="ghost"
        spacing="0"
      >
        <IconButton
          colorScheme="green"
          name="check"
          {...getSubmitButtonProps()}
        />
        <IconButton
          colorScheme="red"
          name="close"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    </InputRightElement>
  ) : (
    <IconButton
      size="sm"
      name="edit"
      variant="ghost"
      marginLeft="2"
      {...getEditButtonProps()}
      position="relative"
    />
  );
};
