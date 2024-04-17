import { useCallback } from "react";
import { useDisclosure, useTranslations } from "../../hooks";
import { IColor } from "../../interfaces";
import { colorNames } from "../../styles/themes";
import { Box } from "../box";
import { Modal } from "../modal";
import { ModalBody } from "../modal-body";
import { ModalHeader } from "../modal-header";
import { Palette } from "../palette";
import { Stack } from "../stack";

export interface ColorPickerProps {
  id?: string;
  color?: IColor | string;
  onChange: (color: IColor | string) => void
}
export const ColorPicker = ({ id, color = "text.500", onChange, ...props }: ColorPickerProps) => {
  const translate = useTranslations();
  const {
    isOpen,
    onToggle
  } = useDisclosure();

  const onChooseColor = useCallback((color: IColor | string) => {
    onChange?.(color);
    onToggle();
  }, [onChange, onToggle])

  return (
    <>
      <Box id={id} width="10" height="10" rounded="md" onClick={onToggle} padding="1" background="gray.100" role="button">
        {color && <Box width="full" height="full" background={color} rounded="sm" />}
      </Box>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalHeader>
          {translate.formatMessage({ id: 'chooseAColor' })}
        </ModalHeader>
        <ModalBody>
          <Stack width="full" direction="column" spacing="0">
            {colorNames?.map(colorName => <Palette key={colorName} color={colorName} activeColor={color as any} onClick={onChooseColor} />)}
          </Stack>
        </ModalBody>
      </Modal>
    </>
  );
};
