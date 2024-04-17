import React from "react";
import { Text } from "../text";
import { IColor, IColorName, IColorHue } from "../../interfaces";
import { BoxProps, Box } from "../box";
import { Label } from "../label";

export type PaletteSize = "xs" | "sm" | "md" | "lg";

export type PaletteVariant = "solid" | "outlined" | "subtle";
export interface PaletteProps extends Omit<BoxProps, 'onClick'> {
  readonly label?: string;
  readonly isShowValue?: boolean;
  readonly color: IColorName;
  readonly activeColor?: IColor;
  readonly size?: PaletteSize;
  readonly onClick?: (color: IColor) => void
}

export const Palette = ({ label, isShowValue, onClick, activeColor, ...props }: PaletteProps) => {
  const color = props?.color || "primary";

  const listColorsValue: IColorHue[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
  ];
  const boxColorWidth = 100 / listColorsValue.length;

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
              onClick={onClick ? () => onClick?.(currentColor) : undefined}
              _hover={!!onClick ? hoverStyle : {}}
              {...(activeColor === currentColor ? hoverStyle : {})}
            >
              {!!isShowValue && <Text fontWeight="bold">{colorValue}</Text>}
            </Box>
          )
        })}
      </Box>
    </Box>
  );
};
