import { useTranslations } from "@/hooks";
import { getProductURL } from "@/utils";
import { Image, Stack, TableCell, TableRow, Text } from "@stokei/ui";
import { memo } from "react";
import { OrderPageOrderItemFragment } from "../../graphql/order.query.graphql.generated";

export interface OrderItemProps {
  readonly orderItem?: OrderPageOrderItemFragment;
}

export const OrderItem = memo(({ orderItem }: OrderItemProps) => {
  const translate = useTranslations();

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
          <Stack direction="column" spacing="4">
            <Text fontWeight="semibold">{orderItem?.product?.name}</Text>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Text fontWeight="semibold">
          {translate.formatMoney({
            showSymbol: true,
            amount: orderItem?.totalAmount || 0,
            currency: orderItem?.price?.currency.id || "",
            minorUnit: orderItem?.price?.currency.minorUnit,
          })}
        </Text>
      </TableCell>
    </TableRow>
  );
});

OrderItem.displayName = "OrderItem";
