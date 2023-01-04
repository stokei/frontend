import React from "react";
import { Text } from "../text";
import { IColor, IColorName, IColorHue } from "../../interfaces";
import { BoxProps, Box } from "../box";
import { Label } from "../label";

export type PaletteSize = "xs" | "sm" | "md" | "lg";

export type PaletteVariant = "solid" | "outlined" | "subtle";
export interface PaletteProps extends BoxProps {
  readonly label?: string;
  readonly isShowValue?: boolean;
  readonly color: IColorName;
  readonly size?: PaletteSize;
}

export const Palette: React.FC<PaletteProps> = ({
  label,
  isShowValue,
  ...props
}) => {
  const color = props?.color || "primary";

  const listColorsValue: IColorHue[] = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
  ];
  const boxColorWidth = 100 / listColorsValue.length;
  return (
    <Box width={"full"} flexDir="column" {...props}>
      {label && <Label>{label}</Label>}
      <Box width={"full"} flexDir={"row"}>
        {listColorsValue.map((colorValue) => (
          <Box
            width={`${boxColorWidth}%`}
            height="40px"
            boxSize={props?.size}
            key={colorValue}
            data-testid="palette-square"
            background={`${color}.${colorValue}` as IColor}
            align="center"
            justify="center"
          >
            {!!isShowValue && <Text fontWeight="bold">{colorValue}</Text>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
