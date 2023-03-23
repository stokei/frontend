import { useTranslations } from "@/hooks";
import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
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
    <Card background="background.50">
      <CardBody>
        <Table>
          <TableHeader>
            <TableHeaderCell>
              {translate.formatMessage({ id: "product" })}
            </TableHeaderCell>
            <TableHeaderCell>
              {translate.formatMessage({ id: "student" })}
            </TableHeaderCell>
            <TableHeaderCell>
              {translate.formatMessage({ id: "subtotal" })}
            </TableHeaderCell>
            <TableHeaderCell>
              {translate.formatMessage({ id: "total" })}
            </TableHeaderCell>
            <TableHeaderCell>
              {translate.formatMessage({ id: "status" })}
            </TableHeaderCell>
            <TableHeaderCell>
              {translate.formatMessage({ id: "paymentMethod" })}
            </TableHeaderCell>
          </TableHeader>
          <TableBody>
            {invoices?.map((invoice) => (
              <InvoiceItem key={invoice?.id} invoice={invoice} />
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
