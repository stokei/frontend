import { AppModel } from "../../types";

export const appendAppBaseURLToPathname = (app: AppModel, pathname: string) => {
  return `${app.url}${pathname}`;
};
