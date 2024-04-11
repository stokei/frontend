import { removeAccessToken, removeRefreshToken } from "@stokei/graphql";
import { websiteRoutes } from "@stokei/routes";

export const onLogout = () => {
  removeAccessToken();
  removeRefreshToken();
  window?.location?.assign?.(websiteRoutes.home);
};
