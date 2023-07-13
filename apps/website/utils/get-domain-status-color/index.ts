import { IColorName } from "@stokei/ui";
import { DomainStatus } from "@/services/graphql/stokei";

export const getDomainStatusColor = (status?: DomainStatus) => {
  const colors: Record<DomainStatus, IColorName> = {
    [DomainStatus.Active]: "success",
    [DomainStatus.Error]: "error",
    [DomainStatus.Pending]: "warning",
  };

  const defaultColor = colors[DomainStatus.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
