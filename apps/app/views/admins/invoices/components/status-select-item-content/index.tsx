import { Box, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";
import { getStatusColor } from "../../mappers/get-status-color";
import { StatusInvoiceFilter } from "../select-filter-status";

interface StatusSelectItemContentProps {
  readonly status?: StatusInvoiceFilter;
  readonly content?: string;
}

export const StatusSelectItemContent: FC<StatusSelectItemContentProps> = ({
  status,
  content,
}) => {
  const statusColor = useMemo(() => getStatusColor(status), [status]);

  return (
    <Stack align="center" direction="row" spacing="2">
      <Box rounded="full" boxSize="2" background={statusColor + ".300"} />
      <Text>{content}</Text>
    </Stack>
  );
};

StatusSelectItemContent.displayName = "StatusSelectItemContent";
