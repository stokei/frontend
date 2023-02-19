import { routes } from "@/routes";

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
    return routes.customers.home;
  }
  return routes.admins.home;
};
