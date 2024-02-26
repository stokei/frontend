import { useAPIErrors, useCurrentApp, useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack } from "@stokei/ui";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { CreateCheckoutPageCheckoutFragment } from "../../graphql/create-checkout.mutation.graphql.generated";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/environments";
import { useMemo, useState } from "react";
import { routes } from "@/routes";

export interface PaymentStripeProps {
  stripe?: CreateCheckoutPageCheckoutFragment["stripe"];
}

const PaymentStripe: React.FC<PaymentStripeProps> = ({
  stripe: stripeProp,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const clientSecret = stripeProp?.clientSecret;

  const translate = useTranslations();
  const { onShowAPIError } = useAPIErrors();
  const stripe = useStripe();
  const elements = useElements();

  const onPay = async () => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    setIsLoading(true);
    const submitError = await elements?.submit();
    if (submitError?.error) {
      onShowAPIError({ message: submitError?.error?.message });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: new URL(
          routes.checkout.callback,
          window.location.href.replace(routes.checkout.home, "")
        ).toString(),
      },
    });

    if (error) {
      onShowAPIError({ message: submitError?.error?.message });
    }
    setIsLoading(false);
  };

  return (
    <Stack direction="column" spacing="5">
      <PaymentElement />

      <ButtonGroup width="full" justifyContent="flex-end">
        <Button onClick={onPay} isLoading={isLoading}>
          {translate.formatMessage({ id: "pay" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const PaymentStripeWithContext: React.FC<PaymentStripeProps> = (props) => {
  const { currentApp } = useCurrentApp();

  const stripe = useMemo(() => {
    if (!currentApp?.stripeAccount) {
      return null;
    }
    return loadStripe(STRIPE_PUBLISHABLE_KEY, {
      stripeAccount: currentApp?.stripeAccount,
    });
  }, [currentApp?.stripeAccount]);

  if (!stripe || !currentApp?.stripeAccount || !props?.stripe?.clientSecret) {
    return <></>;
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret: props?.stripe?.clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <PaymentStripe {...props} />
    </Elements>
  );
};

export { PaymentStripeWithContext as PaymentStripe };
