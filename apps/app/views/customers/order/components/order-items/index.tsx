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
import { OrderItem } from "../order-item";
import { PaymentItem } from "../payment-item";

interface OrderItemsProps {
  readonly order?: OrderPageOrderFragment;
}

export const OrderItems = ({ order }: OrderItemsProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "orderItems" })}
      </Title>

      <Card background="background.50">
        <CardBody>
          <Box width="full" flexDirection="column" overflow="hidden">
            <Box width="full" flexDirection="column" overflowX="auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "product" })}
                    </TableHeaderCell>
                    <TableHeaderCell>
                      {translate.formatMessage({ id: "price" })}
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order?.items?.items?.map((orderItem) => (
                    <OrderItem key={orderItem.id} orderItem={orderItem} />
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
