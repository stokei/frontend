import { useTranslations } from "@/hooks";
import { getProductURL, getInvoiceStatusColor } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  IconButton,
  Image,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { FC, memo, useMemo } from "react";
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

  const statusColor = useMemo(
    () => getInvoiceStatusColor(invoice?.status as any),
    [invoice]
  );

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" spacing="4" align="center">
          <Image
            width="10"
            height="fit-content"
            rounded="sm"
            src={getProductURL(product?.avatarURL)}
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
          <Stack direction="column" spacing="0">
            <Text fontWeight="bold">{customer?.name}</Text>
            <Text fontSize="xs" color="text.300">
              {customer?.email}
            </Text>
          </Stack>
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
        <Text>{translate.formatDate(invoice?.createdAt || "")}</Text>
      </TableCell>
      <TableCell>
        <ButtonGroup
          width="full"
          spacing="1"
          variant="ghost"
          justifyContent="flex-end"
        >
          <IconButton
            name="file"
            isDisabled={!invoice?.url}
            colorScheme="red"
            onClick={() => window.open(invoice?.url || "", "_blank")}
          />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
});

InvoiceItem.displayName = "InvoiceItem";
