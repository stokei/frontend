import { useTranslations } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  Stack,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title,
} from "@stokei/ui";

import { OrderPageOrderFragment } from "../../graphql/order.query.graphql.generated";
import { PaymentItem } from "../payment-item";

interface PaymentsProps {
  readonly order?: OrderPageOrderFragment;
}

export const Payments = ({ order }: PaymentsProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "payments" })}
      </Title>

      <Card background="background.50">
        <CardBody>
          <Box width="full" flexDirection="column" overflow="hidden">
            <Box width="full" flexDirection="column" overflowX="auto">
              <Table>
                <TableHeader>
                  <TableRow>
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
                  {order?.payments?.items?.map((payment) => (
                    <PaymentItem key={payment.id} payment={payment} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Stack>
  );
};
