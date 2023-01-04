export interface StokeiConfigColor {
  readonly text?: string;
  readonly heading?: string;
  readonly primary?: string;
  readonly secondary?: string;
  readonly success?: string;
  readonly error?: string;
  readonly warning?: string;
  readonly info?: string;
}
export interface StokeiConfigFont {
  readonly heading?: string;
  readonly normal?: string;
}

export interface StokeiConfig {
  readonly colors?: StokeiConfigColor;
  readonly fonts?: StokeiConfigFont;
}
