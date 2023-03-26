import { IColorName } from "@stokei/ui";
import { StatusSubscriptionContractFilter } from "../../components/select-filter-status";

export const getStatusColor = (status?: StatusSubscriptionContractFilter) => {
  const colors: Record<StatusSubscriptionContractFilter, IColorName> = {
    [StatusSubscriptionContractFilter.All]: "teal",
    [StatusSubscriptionContractFilter.Active]: "success",
    [StatusSubscriptionContractFilter.Canceled]: "gray",
    [StatusSubscriptionContractFilter.Pending]: "warning",
  };

  const defaultColor = colors[StatusSubscriptionContractFilter.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
