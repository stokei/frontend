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
import { AppOrderFragment } from "../../graphql/orders.query.graphql.generated";
import { OrderItem } from "../order-item";

interface OrdersListProps {
  orders?: AppOrderFragment[];
}

export const OrdersList: FC<OrdersListProps> = ({ orders }) => {
  const translate = useTranslations();
  return (
    <>
      {!orders?.length ? (
        <NotFound>
          <NotFoundIcon name="order" />
          <NotFoundSubtitle>
            {translate.formatMessage({ id: "ordersNotFound" })}
          </NotFoundSubtitle>
        </NotFound>
      ) : (
        <Box width="full" flexDirection="column" overflow="hidden">
          <Box width="full" flexDirection="column" overflowX="auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "product" })}
                  </TableHeaderCell>
                  <TableHeaderCell>
                    {translate.formatMessage({ id: "total" })}
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
                {orders?.map((order) => (
                  <OrderItem key={order?.id} order={order} />
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};
