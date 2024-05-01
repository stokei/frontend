import { removeAccessToken, removeRefreshToken } from "@stokei/graphql";
import { appRoutes } from "@stokei/routes";

export const onLogout = () => {
  removeAccessToken();
  removeRefreshToken();
  window?.location?.assign?.(appRoutes.home);
};
