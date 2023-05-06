import { removeAccessToken, removeRefreshToken } from "@stokei/graphql";
import { routes } from "@/routes";

export const onLogout = () => {
  removeAccessToken();
  removeRefreshToken();
  window?.location?.assign?.(routes.home);
};
