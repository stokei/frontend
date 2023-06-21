import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { Card, CardBody, Stack } from "@stokei/ui";
import { FC } from "react";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { SelectMembers } from "@/components/select-members";
import { SelectFilterStatus } from "../select-filter-status";
import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import { SelectFilterSubscriptionType } from "../select-filter-subscription-type";

interface SubscriptionContractFiltersProps {
  readonly currentStatus: SubscriptionContractStatusFilter;
  readonly currentSubscriptionType: SubscriptionContractTypeFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentSubscriptionType: (
    value?: SubscriptionContractTypeFilter
  ) => void;
  readonly onChooseCurrentSubscriptionType: (
    value: SubscriptionContractTypeFilter
  ) => void;
  readonly onChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
  readonly onRemoveChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
}

export const SubscriptionContractFilters: FC<
  SubscriptionContractFiltersProps
> = ({
  currentStatus,
  currentSubscriptionType,
  currentCustomers,
  onChooseCurrentCustomer,
  onRemoveChooseCurrentCustomer,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
  onChooseCurrentSubscriptionType,
  onRemoveChooseCurrentSubscriptionType,
}) => {
  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction={["column", "column", "row", "row"]} spacing="5">
          <SelectMembers
            hasCurrentAccount={false}
            currentMembers={currentCustomers}
            onChooseCurrentMember={onChooseCurrentCustomer}
            onRemoveChooseCurrentMember={onRemoveChooseCurrentCustomer}
          />
          <SelectFilterSubscriptionType
            currentSubscriptionType={currentSubscriptionType}
            onChooseCurrentSubscriptionType={onChooseCurrentSubscriptionType}
            onRemoveChooseCurrentSubscriptionType={
              onRemoveChooseCurrentSubscriptionType
            }
          />
          <SelectFilterStatus
            currentStatus={currentStatus}
            onChooseCurrentStatus={onChooseCurrentStatus}
            onRemoveChooseCurrentStatus={onRemoveChooseCurrentStatus}
          />
        </Stack>
      </CardBody>
    </Card>
  );
};
