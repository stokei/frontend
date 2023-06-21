import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import { IColorName } from "@stokei/ui";

export const getSubscriptionContractTypeColor = (
  status?: SubscriptionContractTypeFilter
) => {
  const colors: Record<SubscriptionContractTypeFilter, IColorName> = {
    [SubscriptionContractTypeFilter.All]: "teal",
    [SubscriptionContractTypeFilter.OneTime]: "success",
    [SubscriptionContractTypeFilter.Recurring]: "warning",
  };

  const defaultColor = colors[SubscriptionContractTypeFilter.All];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
