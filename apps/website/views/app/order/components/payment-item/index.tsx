import { useTranslations } from "@/hooks";
import { getPaymentStatusColor } from "@/utils/get-payment-status-color";
import {
  Badge,
  Box,
  Icon,
  IconName,
  TableCell,
  TableRow,
  Text
} from "@stokei/ui";
import { useMemo } from "react";
import { OrderPagePaymentFragment } from "../../graphql/order.query.graphql.generated";

export interface PaymentItemProps {
  readonly payment?: OrderPagePaymentFragment;
}

export const PaymentItem = ({ payment }: PaymentItemProps) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getPaymentStatusColor(payment?.status as any),
    [payment]
  );

  return (
    <TableRow>
      <TableCell>
        <Icon name={payment?.paymentGatewayType?.toLowerCase() as IconName} />
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
};
