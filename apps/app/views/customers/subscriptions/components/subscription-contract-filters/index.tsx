import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { Box, Card, CardBody, Stack } from "@stokei/ui";

import { SelectFilterStatus } from "../select-filter-status";

interface SubscriptionContractFiltersProps {
  readonly value: SubscriptionContractStatusFilter;
  readonly onChange: (
    value: SubscriptionContractStatusFilter
  ) => void;
}

export const SubscriptionContractFilters = ({
  value,
  onChange,
}: SubscriptionContractFiltersProps) => {
  return (
    <Stack direction="column" spacing="5">
      <Box width={["full", "full", "33%", "33%"]}>
        <SelectFilterStatus
          value={value}
          onChange={onChange}
        />
      </Box>
    </Stack>
  );
};
