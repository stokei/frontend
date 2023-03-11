import {
  Avatar,
  Badge,
  Box,
  Card,
  CardBody,
  IColor,
  IColorName,
  Image,
  SimpleGrid,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";

import { useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { AppInvoiceFragment } from "../../graphql/invoice.fragment.graphql.generated";
import { InvoiceStatus } from "@/services/graphql/stokei";
import { getCardFlagURL } from "@/utils";

export interface InvoiceItemProps {
  readonly invoice?: AppInvoiceFragment;
}

export const InvoiceItem: FC<InvoiceItemProps> = memo(({ invoice }) => {
  const router = useRouter();
  const translate = useTranslations();

  const statusColor = useMemo(() => {
    const colors: Record<InvoiceStatus, IColorName> = {
      [InvoiceStatus.Canceled]: "gray",
      [InvoiceStatus.Paid]: "success",
      [InvoiceStatus.PaymentError]: "error",
      [InvoiceStatus.Pending]: "warning",
    };

    const defaultColor = colors[InvoiceStatus.Pending];
    if (!invoice?.status) {
      return defaultColor;
    }
    return colors[invoice.status] || defaultColor;
  }, [invoice]);

  return (
    <Card background="background.50">
      <CardBody>
        <SimpleGrid
          columns={[1, 1, 6, 6]}
          row={[6, 6, 1, 1]}
          spacing="5"
          alignItems="center"
        >
          <Stack direction="row" spacing="4" align="center">
            <Avatar
              size="sm"
              src={invoice?.customerAccount?.avatar?.file?.url || ""}
              name={invoice?.customerAccount?.fullname}
            />
            <Stack direction="column" spacing="4">
              <Text fontWeight="bold">
                {invoice?.customerAccount?.fullname}
              </Text>
            </Stack>
          </Stack>
          <Stack direction="row" spacing="4" align="center">
            <Avatar
              size="sm"
              src={invoice?.customerAccount?.avatar?.file?.url || ""}
              name={invoice?.customerAccount?.fullname}
            />
            <Stack direction="column" spacing="4">
              <Text fontWeight="bold">
                {invoice?.customerAccount?.fullname}
              </Text>
            </Stack>
          </Stack>
          <Stack direction="row" spacing="1">
            <Text>{invoice?.currency.symbol}</Text>
            <Text>
              {translate.formatMoney({
                amount: invoice?.totalAmount || 0,
                currency: invoice?.currency.id || "",
                minorUnit: invoice?.currency.minorUnit,
              })}
            </Text>
          </Stack>

          <Stack direction="row" spacing="1">
            <Text fontWeight="semibold" color="primary.500">
              {invoice?.currency.symbol}
            </Text>
            <Text fontWeight="semibold" color="primary.500">
              {translate.formatMoney({
                amount: invoice?.totalAmount || 0,
                currency: invoice?.currency.id || "",
                minorUnit: invoice?.currency.minorUnit,
              })}
            </Text>
          </Stack>

          <Box>
            <Badge colorScheme={statusColor}>
              {translate.formatMessage({
                id: invoice?.status?.toLowerCase() as any,
              })}
            </Badge>
          </Box>

          <Stack direction="row" spacing="3" align="center">
            {invoice?.paymentMethod && (
              <>
                <Image
                  width="8"
                  height="fit-content"
                  src={getCardFlagURL(invoice?.paymentMethod?.cardBrand)}
                  fallbackSrc={getCardFlagURL()}
                  alt={invoice?.paymentMethod?.cardBrand || ""}
                />
                <Text fontSize="sm" fontWeight="semibold" color="primary.500">
                  **** {invoice?.paymentMethod?.lastFourCardNumber}
                </Text>
              </>
            )}
          </Stack>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
});
