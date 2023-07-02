import { CardInput } from "@/components";
import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  Label,
  Stack,
} from "@stokei/ui";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FC, useState } from "react";
import { usePaymentMethodManagementCreatePaymentMethodMutation } from "../graphql/create-payment-method.mutation.graphql.generated";
import { PaymentMethodManagementPaymentMethodFragment } from "../graphql/payment-methods.query.graphql.generated";

interface CreateCreditCardFormProps {
  readonly onSuccess: (
    paymentMethod: PaymentMethodManagementPaymentMethodFragment
  ) => void;
}

export const CreateCreditCardForm: FC<CreateCreditCardFormProps> = ({
  onSuccess,
}) => {
  const [isCreatingPaymentMethod, setIsCreatingPaymentMethod] = useState(false);
  const translate = useTranslations();
  const stripe = useStripe();
  const elements = useElements();
  const { onShowAPIError } = useAPIErrors();

  const [{}, onCreatePaymentMethod] =
    usePaymentMethodManagementCreatePaymentMethodMutation();

  const onCreateCreditCardPaymentMethod = async () => {
    setIsCreatingPaymentMethod(true);
    const cardElement = elements?.getElement(CardElement);

    try {
      if (cardElement) {
        const stripePaymentMethod = await stripe?.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (!!stripePaymentMethod?.error) {
          onShowAPIError({
            message: stripePaymentMethod.error.message,
          });
          setIsCreatingPaymentMethod(false);
          return;
        }
        if (!!stripePaymentMethod?.paymentMethod?.id) {
          const paymentMethodResponse = await onCreatePaymentMethod({
            input: {
              stripePaymentMethod: stripePaymentMethod.paymentMethod.id,
            },
          });
          if (!!paymentMethodResponse?.data?.createPaymentMethod) {
            onSuccess(paymentMethodResponse.data.createPaymentMethod);
            setIsCreatingPaymentMethod(false);
            return;
          }
          if (!!paymentMethodResponse.error?.graphQLErrors?.length) {
            paymentMethodResponse.error.graphQLErrors.map((error) =>
              onShowAPIError({ message: error?.message })
            );
          }
        }
      }
    } catch (error) {}
    setIsCreatingPaymentMethod(false);
  };

  return (
    <Stack direction="column" spacing="4">
      <FormControl>
        <Label>{translate.formatMessage({ id: "creditCard" })}</Label>
        <CardInput />
      </FormControl>
      <ButtonGroup justifyContent="flex-end">
        <Button
          variant="ghost"
          isLoading={isCreatingPaymentMethod}
          onClick={onCreateCreditCardPaymentMethod}
        >
          {translate.formatMessage({ id: "addCard" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
