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
import { memo, useMemo } from "react";
import { OrderPagePaymentFragment } from "../../graphql/order.query.graphql.generated";

export interface PaymentItemProps {
  readonly payment?: OrderPagePaymentFragment;
}

export const PaymentItem = memo(({ payment }: PaymentItemProps) => {
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
        <Text fontWeight="semibold">
          {translate.formatMoney({
            showSymbol: true,
            amount: payment?.totalAmount || 0,
            currency: payment?.currency.id || "",
            minorUnit: payment?.currency.minorUnit,
          })}
        </Text>
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
        {payment?.paidAt && (
          <Text>
            {translate.formatDate(payment?.paidAt, { fullDate: true })}
          </Text>
        )}
      </TableCell>
      <TableCell>
        {payment?.createdAt && (
          <Text>
            {translate.formatDate(payment?.createdAt, { fullDate: true })}
          </Text>
        )}
      </TableCell>
    </TableRow>
  );
});

PaymentItem.displayName = "PaymentItem";
