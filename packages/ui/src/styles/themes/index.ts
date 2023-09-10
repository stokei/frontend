import { extendTheme } from "@chakra-ui/react";
import { StokeiConfig, StokeiConfigColor } from "../../interfaces";
import {
  generatePalette,
  generatePaletteToChakraUI,
} from "../../utils/color-palette";
import { colors } from "./colors";
import { components } from "./components";
import { foundations } from "./foundations";

export * from "./colors";
export { generatePalette, generatePaletteToChakraUI };

const setThemeConfigColors = (colors?: StokeiConfigColor) => ({
  ...(colors?.text && generatePaletteToChakraUI("text", colors?.text)),
  ...(colors?.heading && generatePaletteToChakraUI("heading", colors?.heading)),
  ...(colors?.primary && generatePaletteToChakraUI("primary", colors?.primary)),
  ...(colors?.background &&
    generatePaletteToChakraUI("background", colors?.background)),
  ...(colors?.secondary &&
    generatePaletteToChakraUI("secondary", colors?.secondary)),
  ...(colors?.success && generatePaletteToChakraUI("success", colors?.success)),
  ...(colors?.error && generatePaletteToChakraUI("error", colors?.error)),
  ...(colors?.warning && generatePaletteToChakraUI("warning", colors?.warning)),
  ...(colors?.info && generatePaletteToChakraUI("info", colors?.info)),
});

export const theme = (config?: StokeiConfig) => {
  const themeColors = setThemeConfigColors(config?.colors);
  return extendTheme({
    ...components,
    ...foundations,
    styles: {
      global: {
        initialColorMode: "light",
        useSystemColorMode: false,
        body: {
          bg: "background.100",
        },
        p: {
          color: "text.500",
        },
        "h1, h2, h3, h4, h5, h6": {
          color: "heading.500",
        },
        h1: {
          fontSize: "2xl",
        },
        h2: {
          fontSize: "xl",
        },
        h3: {
          fontSize: "lg",
        },
        h4: {
          fontSize: "md",
        },
        h5: {
          fontSize: "sm",
        },
        h6: {
          fontSize: "xs",
        },
      },
    },
    colors: {
      ...colors,
      ...themeColors,
    },
    fonts: config?.fonts && {
      ...config?.fonts,
      ...(config?.fonts?.heading && { heading: config?.fonts?.heading }),
      ...(config?.fonts?.normal && {
        mono: config?.fonts?.normal,
        body: config?.fonts?.normal,
      }),
    },
  });
};
