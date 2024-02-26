import { SubscriptionContractStatusFilter } from "@/interfaces/subscription-contract-status-filter";
import { getSubscriptionContractStatusColor } from "@/utils/get-subscription-contract-status-color";
import { Box, Stack, Text } from "@stokei/ui";
import { useMemo } from "react";

interface StatusSelectItemContentProps {
  readonly status?: SubscriptionContractStatusFilter;
  readonly content?: string;
}

export const StatusSelectItemContent = ({
  status,
  content,
}: StatusSelectItemContentProps) => {
  const statusColor = useMemo(
    () => getSubscriptionContractStatusColor(status),
    [status]
  );

  return (
    <Stack align="center" direction="row" spacing="2">
      <Box rounded="full" boxSize="2" background={statusColor + ".300"} />
      <Text>{content}</Text>
    </Stack>
  );
};

StatusSelectItemContent.displayName = "StatusSelectItemContent";
