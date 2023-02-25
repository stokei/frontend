import { useTranslations } from "@/hooks";
import { SimpleGrid, Stack, Title } from "@stokei/ui";
import { FC } from "react";
import { AppInvoiceFragment } from "../../graphql/invoice.fragment.graphql.generated";
import { InvoiceItem } from "../invoice-item";

interface InvoicesListProps {
  invoices?: AppInvoiceFragment[];
}

export const InvoicesList: FC<InvoicesListProps> = ({ invoices }) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="3">
      <SimpleGrid
        paddingY="2"
        paddingX="5"
        columns={[1, 1, 5, 5]}
        row={[5, 5, 1, 1]}
        spacing="5"
      >
        <Title fontSize="sm">
          {translate.formatMessage({ id: "student" })}
        </Title>
        <Title fontSize="sm">
          {translate.formatMessage({ id: "subtotal" })}
        </Title>
        <Title fontSize="sm">{translate.formatMessage({ id: "total" })}</Title>
        <Title fontSize="sm">{translate.formatMessage({ id: "status" })}</Title>
        <Title fontSize="sm">
          {translate.formatMessage({ id: "paymentMethod" })}
        </Title>
      </SimpleGrid>
      <Stack direction="column" spacing="3">
        {invoices?.map((invoice) => (
          <InvoiceItem key={invoice?.id} invoice={invoice} />
        ))}
      </Stack>
    </Stack>
  );
};
