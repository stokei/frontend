import { AppLayout } from "@/views/app/layout";
import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Navbar } from "./components/navbar";
import { OrderDetails } from "./components/order-details";
import { OrderItems } from "./components/order-items";
import { Payments } from "./components/payments";
import { Stats } from "./components/stats";
import { useGetOrderPageOrderQuery } from "./graphql/order.query.graphql.generated";
import { Loading as LoadingPage } from "./loading";

export const OrderPage = () => {
  const router = useRouter();
  const orderId = useMemo(
    () => router?.query?.orderId?.toString(),
    [router?.query?.orderId]
  );

  const [{ data: dataGetOrder, fetching: isLoadingOrder }] =
    useGetOrderPageOrderQuery({
      pause: !orderId,
      requestPolicy: "network-only",
      variables: {
        orderId: orderId || "",
      },
    });

  const order = useMemo(() => dataGetOrder?.order, [dataGetOrder]);

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {isLoadingOrder ? (
          <LoadingPage />
        ) : (
          <Container>
            <Stack direction="column" spacing="5">
              <Stats order={order} />
              <OrderDetails order={order} />
              <OrderItems order={order} />
              <Payments order={order} />
            </Stack>
          </Container>
        )}
      </Stack>
    </AppLayout>
  );
};
