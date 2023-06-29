import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { IColorName } from "@stokei/ui";

export const getSubscriptionContractStatusColor = (
  status?: SubscriptionContractStatusFilter
) => {
  const colors: Record<SubscriptionContractStatusFilter, IColorName> = {
    [SubscriptionContractStatusFilter.All]: "teal",
    [SubscriptionContractStatusFilter.Active]: "success",
    [SubscriptionContractStatusFilter.Canceled]: "gray",
    [SubscriptionContractStatusFilter.Pending]: "warning",
  };

  const defaultColor = colors[SubscriptionContractStatusFilter.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
