import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { Box, Card, CardBody, Stack } from "@stokei/ui";
import { FC } from "react";
import { SelectFilterStatus } from "../select-filter-status";

interface SubscriptionContractFiltersProps {
  readonly currentStatus: SubscriptionContractStatusFilter;
  readonly onChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
  readonly onRemoveChooseCurrentStatus: (
    value: SubscriptionContractStatusFilter
  ) => void;
}

export const SubscriptionContractFilters: FC<
  SubscriptionContractFiltersProps
> = ({ currentStatus, onChooseCurrentStatus, onRemoveChooseCurrentStatus }) => {
  return (
    <Stack direction="column" spacing="5">
      <Box width={["full", "full", "33%", "33%"]}>
        <SelectFilterStatus
          currentStatus={currentStatus}
          onChooseCurrentStatus={onChooseCurrentStatus}
          onRemoveChooseCurrentStatus={onRemoveChooseCurrentStatus}
        />
      </Box>
    </Stack>
  );
};
