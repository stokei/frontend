import Cookies from "js-cookie";

export interface CookieAttributes {
  expires?: number | Date | undefined;
  domain?: string | undefined;
  secure?: boolean | undefined;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;
}

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const setCookie = (
  key: string,
  value: any,
  options?: CookieAttributes
) => {
  return Cookies.set(key, value, options);
};

export const removeCookie = (key: string, options?: CookieAttributes) => {
  return Cookies.remove(key, options);
};
