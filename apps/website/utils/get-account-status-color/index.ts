import { AccountStatus } from "@/services/graphql/stokei";
import { IColorName } from "@stokei/ui";

export const getAccountStatusColor = (status?: AccountStatus) => {
  const colors: Record<AccountStatus, IColorName> = {
    [AccountStatus.Active]: "green",
    [AccountStatus.Inactive]: "gray",
    [AccountStatus.Blocked]: "teal",
    [AccountStatus.Canceled]: "red",
    [AccountStatus.ConfigurationPending]: "warning",
  };

  const defaultColor = colors[AccountStatus.Active];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
