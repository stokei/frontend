import { getRoutes } from "@/routes";

export interface GetLoginResponseURLData {
  readonly redirectTo?: string;
  readonly isAdmin?: boolean;
}

export const getLoginResponseURL = ({
  isAdmin,
  redirectTo,
}: GetLoginResponseURLData) => {
  if (!!redirectTo) {
    return redirectTo;
  }
  if (!isAdmin) {
    return getRoutes().customers.home;
  }
  return getRoutes().admins.home;
};
