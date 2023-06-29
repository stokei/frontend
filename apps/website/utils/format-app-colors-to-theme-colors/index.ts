interface Color {
  readonly type: string;
  readonly color: string;
}

export const formatAppColorsToThemeColors = (colors?: Color[] | null) => {
  if (!colors?.length) {
    return;
  }

  return colors?.reduce(
    (prevColor, currentColor) => ({
      ...prevColor,
      [currentColor.type?.toLowerCase()]: currentColor.color,
    }),
    {}
  );
};
