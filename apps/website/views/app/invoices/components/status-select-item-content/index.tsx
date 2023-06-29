import { Box, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";
import { getInvoiceStatusColor } from "@/utils/get-invoice-status-color";
import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";

interface StatusSelectItemContentProps {
  readonly status?: InvoiceStatusFilter;
  readonly content?: string;
}

export const StatusSelectItemContent: FC<StatusSelectItemContentProps> = ({
  status,
  content,
}) => {
  const statusColor = useMemo(() => getInvoiceStatusColor(status), [status]);

  return (
    <Stack align="center" direction="row" spacing="2">
      <Box rounded="full" boxSize="2" background={statusColor + ".300"} />
      <Text>{content}</Text>
    </Stack>
  );
};

StatusSelectItemContent.displayName = "StatusSelectItemContent";
