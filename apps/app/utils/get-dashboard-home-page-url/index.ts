import { appRoutes } from "@stokei/routes";

export interface GetDashboardHomePageURLData {
  readonly redirectTo?: string;
  readonly isAdmin?: boolean;
}

export const getDashboardHomePageURL = ({
  redirectTo,
}: GetDashboardHomePageURLData) => {
  if (!!redirectTo) {
    return redirectTo;
  }
  return appRoutes.customers.home;
};
