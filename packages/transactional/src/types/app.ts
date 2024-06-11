export interface AppModelColor {
  primary: string;
}

export interface AppModel {
  url?: string;
  logoURL?: string;
  name: string;
  email: string;
  colors: AppModelColor;
}
