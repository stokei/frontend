import { AppLayout } from "@/views/app/layout";
import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Navbar } from "./components/navbar";
import { PaymentDetails } from "./components/payment-details";
import { Stats } from "./components/stats";
import { useGetPaymentPagePaymentQuery } from "./graphql/payment.query.graphql.generated";
import { Loading as LoadingPage } from "./loading";

interface PaymentPageProps {}

export const PaymentPage: FC<PaymentPageProps> = () => {
  const router = useRouter();
  const paymentId = useMemo(
    () => router?.query?.paymentId?.toString(),
    [router?.query?.paymentId]
  );

  const [{ data: dataGetPayment, fetching: isLoadingPayment }] =
    useGetPaymentPagePaymentQuery({
      pause: !paymentId,
      variables: {
        paymentId: paymentId || "",
      },
    });

  const payment = useMemo(() => dataGetPayment?.payment, [dataGetPayment]);

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        {isLoadingPayment ? (
          <LoadingPage />
        ) : (
          <Container>
            <Stack direction="column" spacing="5">
              <Stats payment={payment} />
              <PaymentDetails payment={payment} />
            </Stack>
          </Container>
        )}
      </Stack>
    </AppLayout>
  );
};
