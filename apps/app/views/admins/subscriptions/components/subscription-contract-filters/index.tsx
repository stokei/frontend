import { StatusSubscriptionContractFilter } from "@/interfaces/subscription-contract-status-filter";
import { Card, CardBody, Stack } from "@stokei/ui";
import { FC } from "react";
import { AppAccountFragment } from "../../graphql/accounts.query.graphql.generated";
import { SelectFilterCustomers } from "../select-filter-customers";
import { SelectFilterStatus } from "../select-filter-status";

interface SubscriptionContractFiltersProps {
  readonly currentStatus: StatusSubscriptionContractFilter;
  readonly currentCustomers?: AppAccountFragment[];
  readonly onChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onRemoveChooseCurrentCustomer: (value?: AppAccountFragment) => void;
  readonly onChooseCurrentStatus: (
    value: StatusSubscriptionContractFilter
  ) => void;
  readonly onRemoveChooseCurrentStatus: (
    value: StatusSubscriptionContractFilter
  ) => void;
}

export const SubscriptionContractFilters: FC<
  SubscriptionContractFiltersProps
> = ({
  currentStatus,
  currentCustomers,
  onChooseCurrentCustomer,
  onRemoveChooseCurrentCustomer,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
}) => {
  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction={["column", "column", "row", "row"]} spacing="5">
          <SelectFilterCustomers
            currentCustomers={currentCustomers}
            onChooseCurrentCustomer={onChooseCurrentCustomer}
            onRemoveChooseCurrentCustomer={onRemoveChooseCurrentCustomer}
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
