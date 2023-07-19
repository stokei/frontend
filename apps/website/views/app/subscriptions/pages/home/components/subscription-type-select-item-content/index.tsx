import { SubscriptionContractTypeFilter } from "@/interfaces/subscription-contract-type-filter";
import { getSubscriptionContractTypeColor } from "@/utils/get-subscription-contract-type-color";
import { Box, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";

interface SubscriptionTypeSelectItemContentProps {
  readonly type?: SubscriptionContractTypeFilter;
  readonly content?: string;
}

export const SubscriptionTypeSelectItemContent: FC<
  SubscriptionTypeSelectItemContentProps
> = ({ type, content }) => {
  const typeColor = useMemo(
    () => getSubscriptionContractTypeColor(type),
    [type]
  );

  return (
    <Stack align="center" direction="row" spacing="2">
      <Box rounded="full" boxSize="2" background={typeColor + ".300"} />
      <Text>{content}</Text>
    </Stack>
  );
};

SubscriptionTypeSelectItemContent.displayName =
  "SubscriptionTypeSelectItemContent";
