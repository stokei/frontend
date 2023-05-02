export interface GetAccessibleColorParams {
  hex: string;
  darkColor: string;
  lightColor: string;
}
export const getAccessibleColor = ({
  hex,
  lightColor,
  darkColor,
}: GetAccessibleColorParams): string => {
  const defaultColor = lightColor || "#ffffff";
  if (!hex) {
    return defaultColor;
  }
  const color = hex.replace(/#/g, "");
  if (color.length !== 6) {
    return defaultColor;
  }
  const red = parseInt(color[0] + color[1], 16);
  const green = parseInt(color[2] + color[3], 16);
  const blue = parseInt(color[4] + color[5], 16);
  const yiq = (red * 299 + green * 587 + blue * 114) / 1000;
  return yiq >= 128 ? darkColor || "#000000" : defaultColor;
};
