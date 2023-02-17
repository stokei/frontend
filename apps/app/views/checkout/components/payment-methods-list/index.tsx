import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import {
  Box,
  Button,
  Icon,
  Loading,
  Stack,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-method.fragment.graphql.generated";
import {
  GetPaymentMethodsQuery,
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
      onCloseCreatePaymentMethodModal();
    },
    [onCloseCreatePaymentMethodModal]
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
              {paymentMethods.map((currentPaymentMethod) => (
                <PaymentMethodItem
                  key={currentPaymentMethod.id}
                  isActive={
                    currentPaymentMethod?.id === selectedPaymentMethod?.id
                  }
                  paymentMethod={currentPaymentMethod}
                  onChoosePaymentMethod={() =>
                    onChoosePaymentMethod(currentPaymentMethod)
                  }
                />
              ))}
              <Button variant="ghost" onClick={onOpenCreatePaymentMethodModal}>
                {translate.formatMessage({ id: "addNewCard" })}
              </Button>
            </>
          )}
        </Stack>
      )}
    </Box>
  );
};
