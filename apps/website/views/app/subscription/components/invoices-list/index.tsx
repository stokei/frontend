import { useTranslations } from "@/hooks";
import {
  Box,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@stokei/ui";

import { SubscriptionPageInvoiceFragment } from "../../graphql/invoices.query.graphql.generated";
import { InvoiceItem } from "../invoice-item";

interface InvoicesListProps {
  invoices?: SubscriptionPageInvoiceFragment[];
}

export const InvoicesList = ({ invoices }: InvoicesListProps) => {
  const translate = useTranslations();
  return (
    <>
      {!invoices?.length ? (
        <NotFound>
          <NotFoundIcon name="invoice" />
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "invoicesNotFound" })}
          </NotFoundSubtitle>
        </NotFound>
      ) : (
        <Box width="full" flexDirection="column" overflow="hidden">
          <Box width="full" flexDirection="column" overflowX="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "student" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "total" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "status" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "creationDate" })}
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices?.map((invoice) => (
                  <InvoiceItem key={invoice?.id} invoice={invoice} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};
