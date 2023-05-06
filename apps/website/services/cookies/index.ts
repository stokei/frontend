import {
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_HEADER_NAME,
} from "@stokei/graphql";

export const getServerSideAccessToken = (
  cookies: Record<string, string | undefined>
) => {
  return cookies[ACCESS_TOKEN_HEADER_NAME];
};
export const getServerSideRefreshToken = (
  cookies: Record<string, string | undefined>
) => {
  return cookies[REFRESH_TOKEN_HEADER_NAME];
};
