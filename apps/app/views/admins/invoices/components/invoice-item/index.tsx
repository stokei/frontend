import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  IColorName,
  IconButton,
  Image,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";
import defaultNoImage from "@/assets/no-image.png";
import { useTranslations } from "@/hooks";
import { InvoiceStatus } from "@/services/graphql/stokei";
import { getCardFlagURL } from "@/utils";
import { useRouter } from "next/router";
import { AppInvoiceFragment } from "../../graphql/invoices.query.graphql.generated";

export interface InvoiceItemProps {
  readonly invoice?: AppInvoiceFragment;
}

interface Customer {
  name: string;
  avatarURL: string;
  email: string;
}
interface Product {
  id: string;
  name: string;
  avatarURL?: string;
}

export const InvoiceItem: FC<InvoiceItemProps> = memo(({ invoice }) => {
  const router = useRouter();
  const translate = useTranslations();

  const customer = useMemo<Customer | undefined>(() => {
    if (invoice?.customer?.__typename === "Account") {
      return {
        name: invoice?.customer?.fullname,
        email: invoice?.customer?.appEmail || "",
        avatarURL: invoice?.customer?.avatar?.file?.url || "",
      };
    }
    if (invoice?.customer?.__typename === "App") {
      return {
        name: invoice?.customer?.name,
        email: invoice?.customer?.accountEmail || "",
        avatarURL: invoice?.customer?.logo?.file?.url || "",
      };
    }
    return;
  }, [invoice]);

  const product = useMemo<Product | undefined>(() => {
    const currentProduct =
      invoice?.subscriptionContract?.items?.items?.[0]?.product;
    if (currentProduct?.__typename === "Course") {
      return {
        id: currentProduct?.courseId,
        name: currentProduct?.courseName,
        avatarURL: currentProduct?.avatar?.file?.url || "",
      };
    }
    if (currentProduct?.__typename === "Plan") {
      return {
        id: currentProduct?.planId,
        name: currentProduct?.planName,
      };
    }
    return;
  }, [invoice]);

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
    <TableRow>
      <TableCell>
        <Stack direction="row" spacing="4" align="center">
          <Image
            width="10"
            height="fit-content"
            rounded="sm"
            src={product?.avatarURL || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "product" })}
          />
          <Stack direction="column" spacing="4">
            <Text fontWeight="bold">{product?.name}</Text>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing="4" align="center">
          <Avatar size="sm" src={customer?.avatarURL} name={customer?.name} />
          <Stack direction="column" spacing="4">
            <Text fontWeight="bold">{customer?.name}</Text>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <Box>
          <Badge colorScheme={statusColor}>
            {translate.formatMessage({
              id: invoice?.status?.toLowerCase() as any,
            })}
          </Badge>
        </Box>
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <ButtonGroup spacing="1" variant="ghost">
          <IconButton
            name="file"
            isDisabled={!invoice?.url}
            onClick={() => window.open(invoice?.url || "", "_blank")}
          />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
});

InvoiceItem.displayName = "InvoiceItem";
