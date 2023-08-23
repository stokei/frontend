import { PaymentMethod } from "@/components/payment-method";
import { useTranslations } from "@/hooks";
import { getPaymentStatusColor } from "@/utils/get-payment-status-color";
import {
  Badge,
  Box,
  Image,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";
import { OrderPagePaymentFragment } from "../../graphql/order.query.graphql.generated";

export interface PaymentItemProps {
  readonly payment?: OrderPagePaymentFragment;
}

export const PaymentItem: FC<PaymentItemProps> = memo(({ payment }) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getPaymentStatusColor(payment?.status as any),
    [payment]
  );

  return (
    <TableRow>
      <TableCell>
        {payment?.paymentMethod && (
          <PaymentMethod paymentMethod={payment?.paymentMethod} />
        )}
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing="1">
          <Text fontWeight="semibold" color="primary.500">
            {payment?.currency.symbol}
          </Text>
          <Text fontWeight="semibold" color="primary.500">
            {translate.formatMoney({
              amount: payment?.totalAmount || 0,
              currency: payment?.currency.id || "",
              minorUnit: payment?.currency.minorUnit,
            })}
          </Text>
        </Stack>
      </TableCell>
      <TableCell>
        <Box>
          <Badge colorScheme={statusColor}>
            {translate.formatMessage({
              id: payment?.status?.toLowerCase() as any,
            })}
          </Badge>
        </Box>
      </TableCell>
      <TableCell>
        <Text>
          {translate.formatDate(payment?.paidAt || "", { fullDate: true })}
        </Text>
      </TableCell>
      <TableCell>
        <Text>
          {translate.formatDate(payment?.createdAt || "", { fullDate: true })}
        </Text>
      </TableCell>
    </TableRow>
  );
});

PaymentItem.displayName = "PaymentItem";
