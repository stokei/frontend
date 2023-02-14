import { getRoutes } from "@/routes";

export interface GetDashboardHomePageURLData {
  readonly redirectTo?: string;
  readonly isAdmin?: boolean;
}

export const getDashboardHomePageURL = ({
  isAdmin,
  redirectTo,
}: GetDashboardHomePageURLData) => {
  if (!!redirectTo) {
    return redirectTo;
  }
  if (!isAdmin) {
    return getRoutes().customers.home;
  }
  return getRoutes().admins.home;
};
