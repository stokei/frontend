import { useTranslations } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@stokei/ui";
import { FC } from "react";
import { AppInvoiceFragment } from "../../graphql/invoices.query.graphql.generated";
import { InvoiceItem } from "../invoice-item";

interface InvoicesListProps {
  invoices?: AppInvoiceFragment[];
}

export const InvoicesList: FC<InvoicesListProps> = ({ invoices }) => {
  const translate = useTranslations();
  return (
    <Card width="full" background="background.50">
      <CardBody overflow="hidden">
        <Box width="full" flexDirection="column" overflow="hidden">
          <Box width="full" flexDirection="column" overflowX="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "product" })}
                  </TableHeaderCell>
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
      </CardBody>
    </Card>
  );
};
