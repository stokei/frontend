import { IColorName, IColorHue } from "../../interfaces";

const generateLightenOrDarkenColor = (
  colorHexadecimal: string,
  amount: number
): string => {
  let colorWithoutHash = colorHexadecimal.replace("#", "");
  if (colorWithoutHash.length === 3) {
    colorWithoutHash = colorWithoutHash
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }

  const getColorChannel = (substring: string) => {
    const colorChannel = parseInt(substring, 16) + amount;
    let colorChannelString = Math.max(Math.min(255, colorChannel), 0).toString(
      16
    );

    if (colorChannelString.length < 2) {
      colorChannelString = `0${colorChannelString}`;
    }

    return colorChannelString;
  };

  const colorChannelRed = getColorChannel(colorWithoutHash.substring(0, 2));
  const colorChannelGreen = getColorChannel(colorWithoutHash.substring(2, 4));
  const colorChannelBlue = getColorChannel(colorWithoutHash.substring(4, 6));

  return `#${colorChannelRed}${colorChannelGreen}${colorChannelBlue}`;
};

const generateColor = (colorHexadecimal: string, index: number) => {
  const paletteMiddleIndex = 6;
  const paletteLightenColorShift = 8;
  const paletteDarkenColorShift = 8;

  if (index < paletteMiddleIndex) {
    const amount = (paletteMiddleIndex - index) * paletteLightenColorShift;
    return generateLightenOrDarkenColor(colorHexadecimal, amount * 3);
  }
  if (index > paletteMiddleIndex) {
    const amount = (paletteMiddleIndex - index) * paletteDarkenColorShift;
    return generateLightenOrDarkenColor(colorHexadecimal, amount * 2);
  }
  return colorHexadecimal;
};

export const generatePalette = (
  prefix: IColorName,
  colorHexadecimal: string,
  overrideColors?: { [K in `${typeof prefix}.${IColorHue}`]?: string }
): { [K in `${typeof prefix}.${IColorHue}`]?: string } => ({
  [`${prefix}.50`]: generateColor(colorHexadecimal, 1),
  [`${prefix}.100`]: generateColor(colorHexadecimal, 2),
  [`${prefix}.200`]: generateColor(colorHexadecimal, 3),
  [`${prefix}.300`]: generateColor(colorHexadecimal, 4),
  [`${prefix}.400`]: generateColor(colorHexadecimal, 5),
  [`${prefix}.500`]: generateColor(colorHexadecimal, 6),
  [`${prefix}.600`]: generateColor(colorHexadecimal, 7),
  [`${prefix}.700`]: generateColor(colorHexadecimal, 8),
  [`${prefix}.800`]: generateColor(colorHexadecimal, 9),
  [`${prefix}.900`]: generateColor(colorHexadecimal, 10),
  ...overrideColors,
});

export const generatePaletteToChakraUI = (
  prefix: IColorName,
  colorHexadecimal: string,
  overrideColors?: { [K in IColorHue]?: string }
): { [key: string]: { [K in IColorHue]?: string } } => ({
  [prefix]: {
    50: generateColor(colorHexadecimal, 1),
    100: generateColor(colorHexadecimal, 2),
    200: generateColor(colorHexadecimal, 3),
    300: generateColor(colorHexadecimal, 4),
    400: generateColor(colorHexadecimal, 5),
    500: generateColor(colorHexadecimal, 6),
    600: generateColor(colorHexadecimal, 7),
    700: generateColor(colorHexadecimal, 8),
    800: generateColor(colorHexadecimal, 9),
    900: generateColor(colorHexadecimal, 10),
    ...overrideColors,
  },
});
