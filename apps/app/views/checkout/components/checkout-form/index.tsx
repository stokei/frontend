import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { getDashboardHomePageURL } from "@/utils";
import { Button, Form, Loading, Skeleton, Stack, useToast } from "@stokei/ui";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import {
  CreatePaymentMethodMutation,
  useCreatePaymentMethodMutation,
} from "../../graphql/create-payment-method.mutation.graphql.generated";
import { GetCheckoutProductQuery } from "../../graphql/product.query.graphql.generated";
import { PaymentMethodsList } from "../payment-methods-list";
import { PaymentSuccessfully } from "../payment-successfully";

interface CheckoutFormProps {
  readonly product?: GetCheckoutProductQuery["product"];
  readonly clientSecret: string;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({
  product,
  clientSecret: clientSecretURLParam,
}) => {
  const [isLoadingForm, setLoadingForm] = useState(true);
  const [isLoadingPayment, setLoadingPayment] = useState(false);
  const [paymentSuccessfully, setPaymentSuccessfully] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<CreatePaymentMethodMutation["createPaymentMethod"]>();

  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();
  const router = useRouter();
  const { onShowToast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const { onShowAPIError } = useAPIErrors();

  /*
    VERIFICAR SE AINDA HÁ ERRO:
    - AO CLICAR EM COMPRAR QUANDO ESTÁ LOGADO
    - AO CLICAR EM COMPRAR QUANDO NÃO ESTÁ LOGADO
    - QUANDO CARREGA O CHECKOUT COM CLIENT_SECRET
    - QUANDO CARREGA O CHECKOUT SEM CLIENT_SECRET
  */

  const [{ fetching: isCreatingPaymentMethod }, onCreatePaymentMethod] =
    useCreatePaymentMethodMutation();

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

      if (!clientSecretURLParam) {
        setLoadingForm(false);
        return;
      }

      stripe
        .retrievePaymentIntent(clientSecretURLParam)
        .then(({ paymentIntent }) => {
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

    const clientSecret = "PEGAR O CLIENT SECRET DA REQUEST";

    const currentURLClass = new URL(window.location.href);
    currentURLClass.searchParams.set("clientSecret", clientSecret);
    const currentURL = currentURLClass.toString();

    console.log({ location: currentURL });
    // const result = await stripe.confirmPayment({
    //   elements,
    //   redirect: "if_required",
    //   confirmParams: {
    //     return_url: "https://example.com/order/123/complete",
    //   },
    // });

    // if (result.error) {
    //   onShowAPIError({ message: result.error.message });
    // } else {
    //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //     onShowPaymentCallback(paymentIntent?.status);
    //   });
    // }
    setLoadingPayment(false);
  };

  return (
    <Stack direction="column" spacing="5">
      {isLoadingForm ? (
        <Stack direction="column" spacing="4" align="center" justify="center">
          <Skeleton height="16" width="30%" marginBottom="4" />
          <Stack direction="column" spacing="4">
            <Skeleton height="16" />
            <Skeleton height="16" />
            <Skeleton height="16" />
          </Stack>
          <Loading />
        </Stack>
      ) : (
        <>
          {paymentSuccessfully ? (
            <PaymentSuccessfully />
          ) : (
            <>
              <PaymentMethodsList onChoosePaymentMethod={setPaymentMethod} />

              {paymentMethod && (
                <Form onSubmit={onSubmit}>
                  <Button
                    width="full"
                    type="submit"
                    isLoading={isLoadingPayment}
                  >
                    {translate.formatMessage({ id: "subscribe" })}
                  </Button>
                </Form>
              )}
            </>
          )}
        </>
      )}
    </Stack>
  );
};
