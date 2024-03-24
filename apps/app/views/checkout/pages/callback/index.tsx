import { Box, Card, CardBody, Container } from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CheckoutLayout } from "../../layout";
import { PaymentError } from "./components/payment-error";
import { PaymentProcessing } from "./components/payment-processing";
import { PaymentRequiresPaymentMethod } from "./components/payment-requires-payment-method";
import { PaymentSuccessfully } from "./components/payment-successfully";
import { useShoppingCart } from "@stokei/builder";

enum PaymentStatus {
  SUCCEEDED = "succeeded",
  PROCESSING = "processing",
  REQUIRES_PAYMENT_METHOD = "requires_payment_method",
  ERROR = "error",
}

const callbackPaymentComponents = {
  [PaymentStatus.SUCCEEDED]: PaymentSuccessfully,
  [PaymentStatus.PROCESSING]: PaymentProcessing,
  [PaymentStatus.REQUIRES_PAYMENT_METHOD]: PaymentRequiresPaymentMethod,
  [PaymentStatus.ERROR]: PaymentError,
};

export const CheckoutCallbackPage = () => {
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.SUCCEEDED);
  const { onClearShoppingCart } = useShoppingCart();

  const router = useRouter();

  useEffect(() => {
    const checkStripeStatus = () => {
      const redirectStatus = router?.query?.redirect_status;
      if (!redirectStatus) {
        onClearShoppingCart();
        return;
      }
      const statusesValid = [
        PaymentStatus.SUCCEEDED,
        PaymentStatus.PROCESSING,
        PaymentStatus.REQUIRES_PAYMENT_METHOD,
      ];
      const existsStatus = statusesValid.includes(
        redirectStatus as PaymentStatus
      );
      if (existsStatus) {
        if (redirectStatus === PaymentStatus.SUCCEEDED) {
          onClearShoppingCart();
        }
        return setStatus(redirectStatus as PaymentStatus);
      }
      setStatus(PaymentStatus.ERROR);
    };
    checkStripeStatus();
  }, [onClearShoppingCart, router?.query?.redirect_status]);

  const CallbackPaymentComponent = callbackPaymentComponents[status];

  return (
    <CheckoutLayout>
      <Container paddingY="10" align="center">
        <Box
          width={["full", "full", "584px", "584px"]}
          height="fit-content"
          flexDirection="column"
        >
          <Card background="background.50">
            <CardBody>
              <CallbackPaymentComponent />
            </CardBody>
          </Card>
        </Box>
      </Container>
    </CheckoutLayout>
  );
};
