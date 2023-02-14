import { Price } from "@/components";
import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { getDashboardHomePageURL } from "@/utils";
import {
  Box,
  Button,
  Form,
  Icon,
  IconName,
  Loading,
  Stack,
  Text,
  useToast,
} from "@stokei/ui";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { GetCheckoutProductQuery } from "../../graphql/product.query.graphql.generated";

interface CheckoutFormProps {
  readonly product?: GetCheckoutProductQuery["product"];
  readonly clientSecret: string;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({
  product,
  clientSecret,
}) => {
  const [isLoadingForm, setLoadingForm] = useState(true);
  const [isLoadingPayment, setLoadingPayment] = useState(false);
  const [paymentSuccessfully, setPaymentSuccessfully] = useState(false);

  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();
  const router = useRouter();
  const { onShowToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const { onShowAPIError } = useAPIErrors();

  const onShowPaymentCallback = (
    paymentIntentStatus?: PaymentIntent.Status
  ) => {
    switch (paymentIntentStatus) {
      case "succeeded":
        setPaymentSuccessfully(paymentIntentStatus === "succeeded");
        router.push(
          getDashboardHomePageURL({
            isAdmin: !!currentAccount?.isAdmin,
          })
        );
        break;
      case "processing":
        onShowToast({
          status: "info",
          title: translate.formatMessage({ id: "yourPaymentIsProcessing" }),
        });
        break;
      case "requires_payment_method":
        onShowToast({
          status: "error",
          title: translate.formatMessage({
            id: "yourPaymentWasNotSuccessfulPleaseTryAgain",
          }),
        });
        break;
      default:
        onShowToast({
          status: "error",
          title: translate.formatMessage({ id: "somethingWentWrong" }),
        });
        break;
    }
  };

  useEffect(() => {
    const loadPaymentIntentStatus = async () => {
      if (!stripe) {
        return;
      }

      if (!clientSecret) {
        return;
      }

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        setPaymentSuccessfully(paymentIntent?.status === "succeeded");
        setLoadingForm(false);
      });
    };
    loadPaymentIntentStatus();
  }, [stripe]);

  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    setLoadingPayment(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      onShowAPIError({ message: result.error.message });
    } else {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        onShowPaymentCallback(paymentIntent?.status);
      });
    }
    setLoadingPayment(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Stack direction="column" spacing="5">
        {isLoadingForm ? (
          <Box width="full" align="center" justify="center">
            <Loading />
          </Box>
        ) : (
          <>
            {paymentSuccessfully ? (
              <Stack
                direction="column"
                align="center"
                justify="center"
                spacing="1"
              >
                <Icon fontSize="6xl" color="success.500" name="check" />
                <Text fontSize="lg" fontWeight="semibold">
                  {translate.formatMessage({ id: "paymentSucceeded" })}
                </Text>
              </Stack>
            ) : (
              <>
                <Price
                  justify="center"
                  size="lg"
                  price={product?.defaultPrice}
                />
                <PaymentElement
                  options={{
                    layout: "tabs",
                  }}
                />
                <Button width="full" type="submit" isLoading={isLoadingPayment}>
                  {translate.formatMessage({ id: "subscribe" })}
                </Button>
              </>
            )}
          </>
        )}
      </Stack>
    </Form>
  );
};
