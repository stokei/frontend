import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import { addOrRemoveItemFromArray } from "@stokei/utils";
import { useCallback, useState } from "react";

interface UseFiltersData {
  status?: SubscriptionContractStatusFilter;
  type?: SubscriptionContractTypeFilter;
  customers?: AppAccountFragment[];
}

export interface UseFiltersResponse {
  readonly status: SubscriptionContractStatusFilter;
  readonly type: SubscriptionContractTypeFilter;
  readonly customers: AppAccountFragment[];
  readonly onChangeCustomer: (customer: AppAccountFragment) => void;
  readonly setCustomers: (value: AppAccountFragment[]) => void;
  readonly setType: (value: SubscriptionContractTypeFilter) => void;
  readonly setStatus: (value: SubscriptionContractStatusFilter) => void;
  readonly onClearFilters: () => void;
}

export const useFilters = (data?: UseFiltersData) => {
  const [status, setStatus] = useState<SubscriptionContractStatusFilter>(
    data?.status || SubscriptionContractStatusFilter.All
  );
  const [type, setType] = useState<SubscriptionContractTypeFilter>(
    data?.type || SubscriptionContractTypeFilter.All
  );
  const [customers, setCustomers] = useState<AppAccountFragment[]>(
    data?.customers || []
  );

  const onClearFilters = useCallback(() => {
    setStatus(SubscriptionContractStatusFilter.All);
    setType(SubscriptionContractTypeFilter.All);
    setCustomers([]);
  }, []);

  const onChangeCustomer = useCallback((customer: AppAccountFragment) => {
    setCustomers((currentCustomers) =>
      addOrRemoveItemFromArray(currentCustomers, customer, "id")
    );
  }, []);

  return {
    type,
    status,
    customers,
    setStatus,
    setType,
    setCustomers,
    onClearFilters,
    onChangeCustomer,
  } as UseFiltersResponse;
};
