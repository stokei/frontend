import { OrderStatusFilter } from "@/interfaces/order-status-filter";
import { getOrderStatusColor } from "@/utils/get-order-status-color";
import { Box, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";

interface StatusSelectItemContentProps {
  readonly status?: OrderStatusFilter;
  readonly content?: string;
}

export const StatusSelectItemContent: FC<StatusSelectItemContentProps> = ({
  status,
  content,
}) => {
  const statusColor = useMemo(() => getOrderStatusColor(status), [status]);

  return (
    <Stack align="center" direction="row" spacing="2">
      <Box rounded="full" boxSize="2" background={statusColor + ".300"} />
      <Text>{content}</Text>
    </Stack>
  );
};

StatusSelectItemContent.displayName = "StatusSelectItemContent";
