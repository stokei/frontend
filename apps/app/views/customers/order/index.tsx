import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CustomerLayout } from "../layout";
import { Navbar } from "./components/navbar";
import { OrderDetails } from "./components/order-details";
import { Payments } from "./components/payments";
import { useGetOrderPageOrderQuery } from "./graphql/order.query.graphql.generated";
import { Loading as LoadingPage } from "./loading";

interface OrderPageProps {}

export const OrderPage: FC<OrderPageProps> = () => {
  const router = useRouter();
  const orderId = useMemo(
    () => router?.query?.orderId?.toString(),
    [router?.query?.orderId]
  );

  const [{ data: dataGetOrder, fetching: isLoadingOrder }] =
    useGetOrderPageOrderQuery({
      pause: !orderId,
      variables: {
        orderId: orderId || "",
      },
    });

  const order = useMemo(() => dataGetOrder?.order, [dataGetOrder]);

  return (
    <CustomerLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {isLoadingOrder ? (
          <LoadingPage />
        ) : (
          <Container>
            <Stack direction="column" spacing="5">
              <OrderDetails order={order} />
              <Payments order={order} />
            </Stack>
          </Container>
        )}
      </Stack>
    </CustomerLayout>
  );
};
