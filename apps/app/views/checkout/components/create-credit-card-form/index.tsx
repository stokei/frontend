import { CardInput } from "@/components";
import { useAPIErrors, useTranslations } from "@/hooks";
import {
  Button,
  Form,
  FormControl,
  Icon,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Stack,
  Text,
} from "@stokei/ui";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FC, useState } from "react";
import { useCreatePaymentMethodMutation } from "../../graphql/create-payment-method.mutation.graphql.generated";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-method.fragment.graphql.generated";

interface CreateCreditCardFormProps {
  readonly onSuccess: (paymentMethod: CheckoutPaymentMethodFragment) => void;
}

export const CreateCreditCardForm: FC<CreateCreditCardFormProps> = ({
  onSuccess,
}) => {
  const [isCreatingPaymentMethod, setIsCreatingPaymentMethod] = useState(false);
  const translate = useTranslations();
  const stripe = useStripe();
  const elements = useElements();
  const { onShowAPIError } = useAPIErrors();

  const [{}, onCreatePaymentMethod] = useCreatePaymentMethodMutation();

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
    <Form onSubmit={onCreateCreditCardPaymentMethod}>
      <Stack direction="column" spacing="4">
        <FormControl>
          <Label>{translate.formatMessage({ id: "creditCard" })}</Label>
          <CardInput />
        </FormControl>
        <Button
          width="full"
          isLoading={isCreatingPaymentMethod}
          onClick={onCreateCreditCardPaymentMethod}
        >
          {translate.formatMessage({ id: "addCard" })}
        </Button>
      </Stack>
    </Form>
  );
};
