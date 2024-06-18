export interface AppModelColor {
  primary: string;
}

export interface AppModel {
  id: string;
  url?: string;
  logoURL?: string;
  name: string;
  email: string;
  colors: AppModelColor;
}
