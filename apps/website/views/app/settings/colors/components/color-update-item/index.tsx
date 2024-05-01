import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentApp } from "@/hooks/use-current-app";
import { ColorType, ThemeMode } from "@/services/graphql/stokei";
import {
  Button,
  ColorPicker,
  Form,
  FormControl,
  IColorHue,
  IColorName,
  Label,
  Palette,
  Stack,
  onlyHexadecimal,
  useColorValue,
  useStokeiUI,
  useToast
} from "@stokei/ui";
import { useCallback } from "react";
import { useCreateOrUpdateColorMutation } from "../../graphql/create-or-update-color.mutation.graphql.generated";

interface ColorUpdateItemProps {
  colorType: ColorType
}
export const ColorUpdateItem = ({ colorType }: ColorUpdateItemProps) => {
  const translate = useTranslations();
  const { onShowToast } = useToast();
  const { onShowAPIError } = useAPIErrors();
  const { currentApp, onReloadCurrentApp } = useCurrentApp();
  const { getHexdecimalColor } = useStokeiUI();
  const colorName = colorType?.toLowerCase() as IColorName;
  const [color, setColor] = useColorValue({
    defaultColor: getHexdecimalColor(colorName, 500)
  });

  const [{ fetching: isLoadingCreateOrUpdateColor }, onExecuteCreateOrUpdateColor] =
    useCreateOrUpdateColorMutation();

  const getOnlyHexadecimalColor = useCallback(() => {
    if (!color) {
      return
    }
    const isHex = !color?.split('')?.includes('.');
    if (isHex) {
      return "#" + onlyHexadecimal(color)
    }
    const [colorName, colorHue] = color?.split('.') as [IColorName, IColorHue];
    return "#" + onlyHexadecimal(getHexdecimalColor(colorName, colorHue))
  }, [color, getHexdecimalColor]);

  const onSubmit = async () => {
    try {
      const colorValue = getOnlyHexadecimalColor();
      if (!colorValue) {
        return onShowAPIError({ message: 'colorNotFound' });
      }
      const response = await onExecuteCreateOrUpdateColor({
        input: {
          color: colorValue,
          themeMode: ThemeMode.Light,
          type: colorType,
          parent: currentApp?.id || ""
        },
      });
      if (!!response?.data?.createOrUpdateColor) {
        await onReloadCurrentApp();
        return onShowToast({
          title: translate.formatMessage({ id: "updatedSuccessfully" }),
          status: "success",
        });
      }

      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) { }
  };

  return (
    <Stack direction="column" spacing="2">
      <Form onSubmit={onSubmit}>

        <Stack direction="row" spacing="2" align="flex-end">
          <FormControl>
            <Label>{translate.formatMessage({ id: colorName })}</Label>
            <ColorPicker id={colorName} color={color} onChange={setColor} />
          </FormControl>
          <Button
            fontSize="small"
            type="submit"
            isLoading={isLoadingCreateOrUpdateColor}
          >
            {translate.formatMessage({ id: 'save' })}
          </Button>
        </Stack>
      </Form>
      <Palette color={colorName} activeColor={color} />
    </Stack>
  );
};
