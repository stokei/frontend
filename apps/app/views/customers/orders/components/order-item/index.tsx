import { useTranslations } from "@/hooks";
import { getI18nKeyFromRecurringInterval, getProductURL } from "@/utils";
import { getOrderStatusColor } from "@/utils/get-order-status-color";
import {
  Badge,
  Box,
  Description,
  Image,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";
import { AppOrderFragment } from "../../graphql/orders.query.graphql.generated";

export interface OrderItemProps {
  readonly order?: AppOrderFragment;
}

export const OrderItem: FC<OrderItemProps> = memo(({ order }) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getOrderStatusColor(order?.status as any),
    [order]
  );

  const orderItem = useMemo(() => order?.items?.items?.[0], [order]);
  const recurringLabel = useMemo(() => {
    if (!orderItem?.recurring?.interval) {
      return;
    }
    const interalKeys = getI18nKeyFromRecurringInterval(
      orderItem?.recurring?.interval
    );
    const intervalCount = orderItem?.recurring?.intervalCount || 0;
    const intervalTypeLabel =
      intervalCount > 1 ? interalKeys.plural : interalKeys.singular;
    return `${intervalCount} ${translate.formatMessage({
      id: intervalTypeLabel as any,
    })}`;
  }, [
    orderItem?.recurring?.interval,
    orderItem?.recurring?.intervalCount,
    translate,
  ]);
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" spacing="4" align="center">
          <Image
            width="10"
            rounded="sm"
            src={getProductURL(orderItem?.product?.avatar?.file?.url)}
            alt={translate.formatMessage({ id: "product" })}
          />
          <Stack direction="column" spacing="1">
            <Text fontWeight="bold">{orderItem?.price?.nickname}</Text>
            {recurringLabel && <Description>{recurringLabel}</Description>}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing="1">
          <Text fontWeight="semibold" color="primary.500">
            {order?.currency.symbol}
          </Text>
          <Text fontWeight="semibold" color="primary.500">
            {translate.formatMoney({
              amount: order?.totalAmount || 0,
              currency: order?.currency.id || "",
              minorUnit: order?.currency.minorUnit,
            })}
          </Text>
        </Stack>
      </TableCell>
      <TableCell>
        <Box>
          <Badge colorScheme={statusColor}>
            {translate.formatMessage({
              id: order?.status?.toLowerCase() as any,
            })}
          </Badge>
        </Box>
      </TableCell>
      <TableCell>
        <Text>{translate.formatDate(order?.paidAt || "")}</Text>
      </TableCell>
      <TableCell>
        <Text>{translate.formatDate(order?.createdAt || "")}</Text>
      </TableCell>
    </TableRow>
  );
});

OrderItem.displayName = "OrderItem";
