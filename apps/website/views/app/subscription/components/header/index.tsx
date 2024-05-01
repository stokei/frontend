import { useTranslations } from "@/hooks";
import { SubscriptionContractStatus } from "@/services/graphql/stokei";
import { getSubscriptionContractStatusColor } from "@/utils/get-subscription-contract-status-color";
import { Badge, Box, Stack, Text, Title } from "@stokei/ui";
import { useMemo } from "react";
import { SubscriptionPageSubscriptionContractFragment } from "../../graphql/subscription-contract.query.graphql.generated";
import { Customer } from "../../interfaces/customer";
import { Product } from "../../interfaces/product";
import { SubscriptionContractItemMenu } from "../subscription-contract-item-menu";

interface HeaderProps {
  readonly subscriptionContract?: SubscriptionPageSubscriptionContractFragment;
  readonly customer?: Customer;
  readonly product?: Product;
}

export const Header = ({
  subscriptionContract,
  customer,
  product,
}: HeaderProps) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () =>
      getSubscriptionContractStatusColor(subscriptionContract?.status as any),
    [subscriptionContract]
  );

  const isCanceledSubscriptionContract = useMemo(
    () => subscriptionContract?.status === SubscriptionContractStatus.Canceled,
    [subscriptionContract]
  );

  return (
    <Stack
      direction={["column", "column", "row", "row"]}
      spacing="5"
      justify="space-between"
    >
      <Stack
        display={["none", "none", "flex", "flex"]}
        width="fit-content"
        direction="row"
        spacing="5"
        align="center"
      >
        <Stack direction="row" spacing="2" align="baseline">
          <Title fontSize="xl" lineHeight="shorter">
            {customer?.name}
          </Title>
          <Text>
            {translate.formatMessage({
              id: "in",
            })}
          </Text>
          <Title fontSize="xl" lineHeight="shorter">
            {product?.name}
          </Title>
        </Stack>
        <Badge colorScheme={statusColor}>
          {translate.formatMessage({
            id: subscriptionContract?.status?.toLowerCase() as any,
          })}
        </Badge>
      </Stack>
      {!isCanceledSubscriptionContract && (
        <Box>
          <SubscriptionContractItemMenu
            subscriptionContractId={subscriptionContract?.id}
            customer={customer}
            product={product}
          />
        </Box>
      )}
    </Stack>
  );
};
