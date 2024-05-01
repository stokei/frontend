import { useCallback, useMemo } from "react";
import { useStokeiUI } from "../../hooks";
import { IColor, IColorHue, IColorName } from "../../interfaces";
import { Box, BoxProps } from "../box";
import { Label } from "../label";
import { Text } from "../text";

export type PaletteSize = "xs" | "sm" | "md" | "lg";

export type PaletteVariant = "solid" | "outlined" | "subtle";
export interface PaletteProps extends Omit<BoxProps, 'onClick'> {
  readonly label?: string;
  readonly isShowValue?: boolean;
  readonly color: IColorName;
  readonly activeColor?: IColor | string;
  readonly size?: PaletteSize;
  readonly onClick?: (colorName: IColorName, colorHue: IColorHue) => void
}

export const Palette = ({ label, isShowValue, onClick, activeColor, ...props }: PaletteProps) => {
  const { getColorByHexdecimal } = useStokeiUI();
  const color = props?.color || "primary";

  const listColorsValue: IColorHue[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
  ];
  const boxColorWidth = 100 / listColorsValue.length;

  const isActiveColor = useCallback((currentColor: string) => {
    if (!activeColor) {
      return false
    }
    const isHexadecimal = !activeColor?.split('')?.includes('.');
    if (isHexadecimal) {
      return getColorByHexdecimal(activeColor, color) === currentColor
    }
    return currentColor === activeColor
  }, [activeColor, color, getColorByHexdecimal]);

  const hoverStyle: BoxProps = {
    borderWidth: "thick",
    borderColor: "red",
  }

  return (
    <Box width={"full"} flexDir="column" {...props}>
      {label && <Label>{label}</Label>}
      <Box width={"full"} flexDir={"row"}>
        {listColorsValue.map((colorValue) => {
          const currentColor = `${color}.${colorValue}` as IColor
          const isActive = isActiveColor(currentColor);
          return (
            <Box
              width={`${boxColorWidth}%`}
              height={`40px`}
              boxSize={props?.size}
              key={colorValue}
              data-testid="palette-square"
              background={currentColor}
              align="center"
              justify="center"
              onClick={onClick ? () => onClick?.(color, colorValue) : undefined}
              _hover={!!onClick ? hoverStyle : {}}
              {...(isActive ? hoverStyle : {})}
            >
              {!!isShowValue && <Text fontWeight="bold">{colorValue}</Text>}
            </Box>
          )
        })}
      </Box>
    </Box>
  );
};
