import { useTranslations } from "@/hooks";
import { getInvoiceStatusColor } from "@/utils";
import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { useMemo } from "react";
import { SubscriptionPageInvoiceFragment } from "../../graphql/invoices.query.graphql.generated";

export interface InvoiceItemProps {
  readonly invoice?: SubscriptionPageInvoiceFragment;
}

interface Customer {
  name: string;
  avatarURL: string;
  email: string;
}
export const InvoiceItem = ({ invoice }: InvoiceItemProps) => {
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

  const statusColor = useMemo(
    () => getInvoiceStatusColor(invoice?.status as any),
    [invoice]
  );

  return (
    <TableRow>
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
            onClick={() => window.open(invoice?.url || "", "_blank")}
          />
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};
