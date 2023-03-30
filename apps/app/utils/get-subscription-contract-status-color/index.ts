import { StatusSubscriptionContractFilter } from "@/interfaces/subscription-contract-status-filter";
import { IColorName } from "@stokei/ui";

export const getSubscriptionContractStatusColor = (
  status?: StatusSubscriptionContractFilter
) => {
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
