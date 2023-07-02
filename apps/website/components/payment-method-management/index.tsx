import { useTranslations } from "@/hooks";
import {
  Box,
  Button,
  Description,
  Loading,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useCallback, useEffect, useState } from "react";
import { CreateCreditCardForm } from "./create-credit-card-form";
import { CreateCreditCardModal } from "./create-credit-card-modal";
import {
  PaymentMethodManagementPaymentMethodFragment,
  usePaymentMethodManagementPaymentMethodsQuery,
} from "./graphql/payment-methods.query.graphql.generated";
import { PaymentMethodItem } from "./payment-method-item";
import { STRIPE_PUBLISHABLE_KEY } from "@/environments";
import { Elements } from "@stripe/react-stripe-js";

const stripeLoadElements = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface PaymentMethodManagementProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly paymentMethodParent: string;
  readonly selectedPaymentMethod?: PaymentMethodManagementPaymentMethodFragment;
  readonly onChoosePaymentMethod: (
    paymentMethod: PaymentMethodManagementPaymentMethodFragment
  ) => void;
}

export const PaymentMethodManagement: FC<PaymentMethodManagementProps> = ({
  title,
  subtitle,
  paymentMethodParent,
  selectedPaymentMethod,
  onChoosePaymentMethod,
}) => {
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodManagementPaymentMethodFragment[]
  >([]);

  const {
    isOpen: isOpenCreatePaymentMethodModal,
    onClose: onCloseCreatePaymentMethodModal,
    onOpen: onOpenCreatePaymentMethodModal,
  } = useDisclosure();

  const translate = useTranslations();

  const [{ fetching: isLoadingPaymentMethods, data: dataPaymentMethods }] =
    usePaymentMethodManagementPaymentMethodsQuery({
      pause: !paymentMethodParent,
      variables: {
        where: {
          AND: {
            parent: {
              equals: paymentMethodParent,
            },
          },
        },
      },
    });

  useEffect(() => {
    console.log({ dataPaymentMethods });
    if (!!dataPaymentMethods?.paymentMethods?.items?.length) {
      setPaymentMethods(dataPaymentMethods.paymentMethods.items);
    }
  }, [dataPaymentMethods]);

  const onAddNewPaymentMethod = useCallback(
    (paymentMethod?: PaymentMethodManagementPaymentMethodFragment) => {
      if (!paymentMethod) {
        return;
      }
      setPaymentMethods((currentPaymentMethods) => [
        ...currentPaymentMethods,
        paymentMethod,
      ]);
      onChoosePaymentMethod(paymentMethod);
      onCloseCreatePaymentMethodModal();
    },
    [onChoosePaymentMethod, onCloseCreatePaymentMethodModal]
  );

  const onChangePaymentMethod = useCallback(
    (value: string) => {
      const paymentMethod = paymentMethods?.find(
        (method) => method.id === value
      );
      if (paymentMethod) {
        onChoosePaymentMethod(paymentMethod);
      }
    },
    [onChoosePaymentMethod, paymentMethods]
  );

  return (
    <Elements
      stripe={stripeLoadElements}
      options={{
        appearance: {
          theme: "stripe",
        },
        locale: translate.locale as any,
      }}
    >
      <Box width="full" flexDirection="column">
        <CreateCreditCardModal
          isOpen={isOpenCreatePaymentMethodModal}
          onClose={onCloseCreatePaymentMethodModal}
          onSuccess={onAddNewPaymentMethod}
        />
        {isLoadingPaymentMethods ? (
          <Stack direction="column" spacing="4" align="center" justify="center">
            <Loading />
          </Stack>
        ) : (
          <Stack direction="column" spacing="4">
            <Title fontSize="lg">
              {title || translate.formatMessage({ id: "chooseYourCard" })}
            </Title>
            {subtitle && <Description>{subtitle}</Description>}
            {!paymentMethods.length ? (
              <CreateCreditCardForm onSuccess={onAddNewPaymentMethod} />
            ) : (
              <>
                <RadioGroup
                  onChange={onChangePaymentMethod}
                  value={selectedPaymentMethod?.id || ""}
                >
                  <Stack direction="column" spacing="4">
                    {paymentMethods.map((currentPaymentMethod) => (
                      <RadioCard
                        key={currentPaymentMethod.id}
                        id={"payment-method-" + currentPaymentMethod?.id}
                        value={currentPaymentMethod?.id}
                        isChecked={
                          currentPaymentMethod?.id === selectedPaymentMethod?.id
                        }
                      >
                        <PaymentMethodItem
                          paymentMethod={currentPaymentMethod}
                        />
                      </RadioCard>
                    ))}
                  </Stack>
                </RadioGroup>
                <Button variant="link" onClick={onOpenCreatePaymentMethodModal}>
                  {translate.formatMessage({ id: "addNewCard" })}
                </Button>
              </>
            )}
          </Stack>
        )}
      </Box>
    </Elements>
  );
};
