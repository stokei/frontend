import { AppStatus } from "@/services/graphql/stokei";
import { IColorName } from "@stokei/ui";

export const getAppStatusColor = (status?: AppStatus) => {
  const colors: Record<AppStatus, IColorName> = {
    [AppStatus.Active]: "green",
    [AppStatus.Inactive]: "gray",
    [AppStatus.Blocked]: "teal",
  };

  const defaultColor = colors[AppStatus.Active];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
