import { useTranslations } from "@/hooks";
import { appRoutes } from "@stokei/routes";
import { convertEnumValueToCamelCase, getProductURL } from "@/utils";
import { getOrderStatusColor } from "@/utils/get-order-status-color";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AppOrderFragment } from "../../graphql/orders.query.graphql.generated";
import { CouponItem } from "../coupon-item";

export interface OrderItemProps {
  readonly order?: AppOrderFragment;
  readonly hasCoupon?: boolean;
}

export const OrderItem = ({ order, hasCoupon }: OrderItemProps) => {
  const router = useRouter();
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getOrderStatusColor(order?.status as any),
    [order]
  );

  const orderItems = useMemo(() => order?.items?.items, [order]);

  const goToOrderPage = () => {
    router.push(appRoutes.customers.orders.order({ order: order?.id }));
  };

  return (
    <TableRow onClick={goToOrderPage}>
      <TableCell>
        <AvatarGroup>
          {orderItems?.map((orderItem) => (
            <Avatar
              key={orderItem?.id}
              size="sm"
              src={getProductURL(orderItem?.product?.avatar?.file?.url)}
              name={orderItem?.price?.nickname || ""}
            />
          ))}
        </AvatarGroup>
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
              id: convertEnumValueToCamelCase(order?.status || "") as any,
            })}
          </Badge>
        </Box>
      </TableCell>
      <TableCell>
        <Text>{translate.formatDate(order?.paidAt || "")}</Text>
      </TableCell>
      {hasCoupon && (
        <TableCell>
          {order?.coupon && <CouponItem coupon={order?.coupon} />}
        </TableCell>
      )}
      <TableCell>
        <Text>{translate.formatDate(order?.createdAt || "")}</Text>
      </TableCell>
    </TableRow>
  );
};
