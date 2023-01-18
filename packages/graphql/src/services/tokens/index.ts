import {
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "../../constants";
import {
  getCookie,
  setCookie,
  removeCookie,
  CookieAttributes,
} from "../cookies";

export const getAccessToken = () => getCookie(ACCESS_TOKEN_HEADER_NAME);
export const setAccessToken = (
  accessTokenValue: string,
  prefixTokenValue?: string,
  options?: CookieAttributes
) => {
  let value = accessTokenValue;
  if (prefixTokenValue) {
    value = prefixTokenValue + " " + accessTokenValue;
  }
  setCookie(ACCESS_TOKEN_HEADER_NAME, value, options);
};
export const removeAccessToken = (options?: CookieAttributes) =>
  removeCookie(ACCESS_TOKEN_HEADER_NAME, options);

export const getRefreshToken = () => getCookie(REFRESH_TOKEN_HEADER_NAME);
export const setRefreshToken = (value: string, options?: CookieAttributes) =>
  setCookie(REFRESH_TOKEN_HEADER_NAME, value, options);
export const removeRefreshToken = (options?: CookieAttributes) =>
  removeCookie(REFRESH_TOKEN_HEADER_NAME, options);
