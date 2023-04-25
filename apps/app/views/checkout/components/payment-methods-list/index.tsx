import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import {
  Box,
  Button,
  Loading,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useState } from "react";
import {
  CheckoutPaymentMethodFragment,
  useGetPaymentMethodsQuery,
} from "../../graphql/payment-methods.query.graphql.generated";
import { CreateCreditCardForm } from "../create-credit-card-form";
import { CreateCreditCardModal } from "../create-credit-card-modal";
import { PaymentMethodItem } from "../payment-method-item";

interface PaymentMethodsListProps {
  readonly selectedPaymentMethod?: CheckoutPaymentMethodFragment;
  readonly onChoosePaymentMethod: (
    paymentMethod: CheckoutPaymentMethodFragment
  ) => void;
}

export const PaymentMethodsList: FC<PaymentMethodsListProps> = ({
  selectedPaymentMethod,
  onChoosePaymentMethod,
}) => {
  const [paymentMethods, setPaymentMethods] = useState<
    CheckoutPaymentMethodFragment[]
  >([]);

  const {
    isOpen: isOpenCreatePaymentMethodModal,
    onClose: onCloseCreatePaymentMethodModal,
    onOpen: onOpenCreatePaymentMethodModal,
  } = useDisclosure();

  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();

  const [{ fetching: isLoadingPaymentMethods, data: dataPaymentMethods }] =
    useGetPaymentMethodsQuery({
      pause: !currentAccount,
      variables: {
        where: {
          AND: {
            parent: {
              equals: currentAccount?.id,
            },
          },
        },
      },
    });

  useEffect(() => {
    if (!!dataPaymentMethods?.paymentMethods?.items?.length) {
      setPaymentMethods(dataPaymentMethods.paymentMethods.items);
    }
  }, [dataPaymentMethods]);

  const onAddNewPaymentMethod = useCallback(
    (paymentMethod?: CheckoutPaymentMethodFragment) => {
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
            {translate.formatMessage({ id: "chooseYourCard" })}
          </Title>
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
                      <PaymentMethodItem paymentMethod={currentPaymentMethod} />
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
  );
};
