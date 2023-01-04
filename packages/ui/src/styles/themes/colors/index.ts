import { IColorHue, IColorName } from "../../../interfaces";
import { generatePaletteToChakraUI } from "../../../utils/color-palette";

export const colorHues: IColorHue[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];

export const colorNames: IColorName[] = [
  "background",
  "black",
  "blue",
  "cyan",
  "disabled",
  "error",
  "facebook",
  "gray",
  "green",
  "heading",
  "info",
  "linkedin",
  "messenger",
  "orange",
  "pink",
  "primary",
  "purple",
  "red",
  "secondary",
  "success",
  "teal",
  "telegram",
  "text",
  "twitter",
  "warning",
  "whatsapp",
  "white",
  "yellow",
];

export const colors = {
  ...generatePaletteToChakraUI("primary", "#24615e"),
  ...generatePaletteToChakraUI("secondary", "#EE833C"),
  ...generatePaletteToChakraUI("text", "#3c5251"),
  ...generatePaletteToChakraUI("heading", "#0C2221"),
  ...generatePaletteToChakraUI("background", "#8fa3a3", {
    "50": "#fbfefe",
    "100": "#f1f8f8",
    "200": "#ddeeee",
  }),
  ...generatePaletteToChakraUI("success", "#38a169"),
  ...generatePaletteToChakraUI("error", "#e53e3e"),
  ...generatePaletteToChakraUI("warning", "#d69e2e"),
  ...generatePaletteToChakraUI("info", "#00b5d8"),
  ...generatePaletteToChakraUI("disabled", "#9fa5a5"),
  ...generatePaletteToChakraUI("black", "#0e2524"),
  ...generatePaletteToChakraUI("white", "#fbfefe"),
};
