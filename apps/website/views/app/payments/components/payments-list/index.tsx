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
import { FC } from "react";
import { AppPaymentFragment } from "../../graphql/payments.query.graphql.generated";
import { PaymentItem } from "../payment-item";

interface PaymentsListProps {
  payments?: AppPaymentFragment[];
}

export const PaymentsList: FC<PaymentsListProps> = ({ payments }) => {
  const translate = useTranslations();
  return (
    <>
      {!payments?.length ? (
        <NotFound>
          <NotFoundIcon name="price" />
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "paymentsNotFound" })}
          </NotFoundSubtitle>
        </NotFound>
      ) : (
        <Box width="full" flexDirection="column" overflow="hidden">
          <Box width="full" flexDirection="column" overflowX="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "payer" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "paymentMethod" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "value" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "status" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "paid" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "creationDate" })}
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments?.map((payment) => (
                  <PaymentItem key={payment.id} payment={payment} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};
