import { useCallback, useMemo } from "react";
import { useDisclosure, useStokeiUI, useTranslations } from "../../hooks";
import { IColor, IColorHue, IColorName } from "../../interfaces";
import { colorNames } from "../../styles/themes";
import { Box } from "../box";
import { Modal } from "../modal";
import { ModalBody } from "../modal-body";
import { ModalHeader } from "../modal-header";
import { Palette } from "../palette";
import { Stack } from "../stack";
import { InputGroup } from "../input-group";
import { Input } from "../input";
import { InputRightAddon } from "../input-right-addon";
import { InputLeftAddon } from "../input-left-addon";
import { onlyHexadecimal } from "../../utils/only-hexadecimal";
import { Button } from "../button";


export interface ColorPickerProps {
  id: string;
  color?: IColor | string;
  onChange: (color?: IColor | string) => void
}
export const ColorPicker = ({ id, color, onChange, ...props }: ColorPickerProps) => {
  const translate = useTranslations();
  const { getHexdecimalColor } = useStokeiUI();
  const currentInputValue = useMemo(() => {
    if (!color) {
      return ""
    }
    const getValue = () => {
      const isHex = !color?.split('')?.includes('.');
      if (isHex) {
        return color
      }
      const [colorName, colorHue] = color?.split('.') as [IColorName, IColorHue];
      if (!colorName || !colorHue) {
        return color;
      }
      const hexColor = getHexdecimalColor(colorName, colorHue);
      if (!hexColor) {
        return color;
      }
      return hexColor;
    }
    return onlyHexadecimal(getValue());
  }, [color, getHexdecimalColor]);

  const {
    isOpen,
    onToggle
  } = useDisclosure();

  const onChoosePaletteColor = useCallback((colorName?: IColorName, colorHue?: IColorHue) => {
    onChange?.(colorName && colorHue ? `${colorName}.${colorHue}` : undefined);
    onToggle();
  }, [onChange, onToggle])

  const onChangeInput = useCallback((color: IColor | string) => {
    const colorChars = onlyHexadecimal(color)?.split('') || [];
    if (colorChars[0] === '#') {
      colorChars?.shift();
    }
    const colorWithoutHashtag = colorChars.join('')
    onChange?.("#" + colorWithoutHashtag)
  }, [onChange]);

  return (
    <>
      <InputGroup>
        <InputLeftAddon>
          #
        </InputLeftAddon>
        <Input
          id={id}
          value={currentInputValue}
          onChange={e => {
            e.target.value = onlyHexadecimal(e.target.value);
            onChangeInput(e.target.value)
          }}
          placeholder="000FFF"
          minLength={6}
          maxLength={8}
          rounded="0"
        />
        <InputRightAddon>
          <Box width="8" height="8" rounded="md" onClick={onToggle} padding="1" background="gray.100" role="button">
            <Box
              width="full"
              height="full"
              background={color}
              rounded="sm"
              borderWidth="thin"
              borderColor="gray.500"
            />
          </Box>
        </InputRightAddon>
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalHeader>
          {translate.formatMessage({ id: 'chooseAColor' })}
        </ModalHeader>
        <ModalBody>
          <Stack width="full" direction="column" spacing="5" paddingBottom="5">
            <Button width="full" onClick={() => onChoosePaletteColor()} variant="outline">
              {translate.formatMessage({ id: 'transparent' })}
            </Button>
            <Stack width="full" direction="column" spacing="0">
              {colorNames?.map(colorName => <Palette key={colorName} color={colorName} activeColor={color as any} onClick={onChoosePaletteColor} />)}
            </Stack>
          </Stack>
        </ModalBody>
      </Modal>
    </>
  );
};
