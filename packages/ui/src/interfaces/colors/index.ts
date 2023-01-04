export type IColorName =
  | "text"
  | "heading"
  | "disabled"
  | "background"
  | "primary"
  | "secondary"
  | "white"
  | "black"
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "cyan"
  | "purple"
  | "pink"
  | "linkedin"
  | "facebook"
  | "messenger"
  | "whatsapp"
  | "twitter"
  | "telegram"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface IColorHues {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export type IColorHue = keyof IColorHues;

export type IColor = `${IColorName}.${IColorHue}`;

export type IColors = { [K in IColor]?: string };
