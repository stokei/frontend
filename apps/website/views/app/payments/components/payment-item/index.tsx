import { PaymentMethod } from "@/components/payment-method";
import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { getPaymentStatusColor } from "@/utils/get-payment-status-color";
import {
  Avatar,
  Badge,
  Box,
  Icon,
  IconName,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AppPaymentFragment } from "../../graphql/payments.query.graphql.generated";

export interface PaymentItemProps {
  readonly payment?: AppPaymentFragment;
}

export const PaymentItem = ({ payment }: PaymentItemProps) => {
  const router = useRouter();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getPaymentStatusColor(payment?.status as any),
    [payment]
  );

  const goToPaymentDetails = () =>
    router.push(
      websiteRoutes
        .app({ appId: currentApp?.id })
        .payments.payment({ payment: payment?.id })
    );

  return (
    <TableRow onClick={goToPaymentDetails}>
      <TableCell>
        {payment?.payer && (
          <Stack direction="row" spacing="4" align="center">
            <Avatar
              size="sm"
              src={payment?.payer?.avatar?.file?.url || ""}
              name={payment?.payer?.fullname}
            />
            <Stack direction="column" spacing="0">
              <Text fontWeight="bold">{payment?.payer?.fullname}</Text>
              <Text fontSize="xs" color="text.300">
                {payment?.payer?.email}
              </Text>
            </Stack>
          </Stack>
        )}
      </TableCell>
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
