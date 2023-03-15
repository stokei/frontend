import { useAPIErrors, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { Button, Form, Stack } from "@stokei/ui";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { CreatePaymentMethodMutation } from "../../graphql/create-payment-method.mutation.graphql.generated";
import { GetCheckoutProductQuery } from "../../graphql/product.query.graphql.generated";
import { useSubscribeProductMutation } from "../../graphql/subscribe-product.mutation.graphql.generated";
import { PaymentMethodsList } from "../payment-methods-list";
import { PaymentSuccessfully } from "../payment-successfully";

interface CheckoutFormProps {
  readonly product?: GetCheckoutProductQuery["product"];
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ product }) => {
  const [paymentSuccessfully, setPaymentSuccessfully] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<CreatePaymentMethodMutation["createPaymentMethod"]>();

  const translate = useTranslations();
  const { homePageURL } = useCurrentAccount();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { onShowAPIError } = useAPIErrors();

  const [{ fetching: isLoadingSubscribeProduct }, onExecuteSubscribeProduct] =
    useSubscribeProductMutation();

  const onSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await onExecuteSubscribeProduct({
        input: {
          price: product?.defaultPrice?.id || "",
          paymentMethod: paymentMethod?.id || "",
        },
      });

      if (!!response?.data?.subscribeProduct) {
        setPaymentSuccessfully(true);
        router.push(homePageURL || "");
        return;
      }
      if (!!response.error?.graphQLErrors?.length) {
        response.error.graphQLErrors.map((error) =>
          onShowAPIError({ message: error?.message })
        );
      }
    } catch (error) {
      onShowAPIError({
        message: translate.formatMessage({ id: "somethingWentWrong" }),
      });
    }
  };

  return (
    <Stack direction="column" spacing="5">
      {paymentSuccessfully ? (
        <PaymentSuccessfully />
      ) : (
        <>
          <PaymentMethodsList
            selectedPaymentMethod={paymentMethod}
            onChoosePaymentMethod={setPaymentMethod}
          />

          <Form onSubmit={onSubmit}>
            <Button
              width="full"
              type="submit"
              isDisabled={!paymentMethod}
              isLoading={isLoadingSubscribeProduct}
            >
              {translate.formatMessage({ id: "subscribe" })}
            </Button>
          </Form>
        </>
      )}
    </Stack>
  );
};
