import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
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
import { useCallback, useEffect, useState } from "react";
import { CreateCreditCardForm } from "./create-credit-card-form";
import { CreateCreditCardModal } from "./create-credit-card-modal";
import {
  PaymentMethodManagementPaymentMethodCardFragment,
  usePaymentMethodManagementPaymentMethodsQuery,
} from "./graphql/payment-methods.query.graphql.generated";
import { PaymentMethodItem } from "./payment-method-item";

interface PaymentMethodManagementProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly address?: string;
  readonly selectedPaymentMethod?: PaymentMethodManagementPaymentMethodCardFragment;
  readonly onChoosePaymentMethod: (
    paymentMethod: PaymentMethodManagementPaymentMethodCardFragment
  ) => void;
}

export const PaymentMethodManagement = ({
  title,
  subtitle,
  address,
  selectedPaymentMethod,
  onChoosePaymentMethod,
}: PaymentMethodManagementProps) => {
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodManagementPaymentMethodCardFragment[]
  >([]);

  const {
    isOpen: isOpenCreatePaymentMethodModal,
    onClose: onCloseCreatePaymentMethodModal,
    onOpen: onOpenCreatePaymentMethodModal,
  } = useDisclosure();

  const translate = useTranslations();
  const { currentAccount } = useCurrentAccount();

  const [{ fetching: isLoadingPaymentMethods, data: dataPaymentMethods }] =
    usePaymentMethodManagementPaymentMethodsQuery({
      pause: !currentAccount?.id,
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
      if (!selectedPaymentMethod) {
        onChoosePaymentMethod(dataPaymentMethods.paymentMethods.items[0]);
      }
    }
  }, [dataPaymentMethods, onChoosePaymentMethod, selectedPaymentMethod]);

  const onAddNewPaymentMethod = useCallback(
    (paymentMethod?: PaymentMethodManagementPaymentMethodCardFragment) => {
      if (!paymentMethod) {
        return;
      }
      setPaymentMethods((currentPaymentMethods) => {
        const existsPaymentMethod = currentPaymentMethods?.some(
          (payMethod) => payMethod.id === paymentMethod?.id
        );
        if (existsPaymentMethod) {
          return currentPaymentMethods;
        }
        return [...currentPaymentMethods, paymentMethod];
      });
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
        address={address}
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
            <CreateCreditCardForm
              onSuccess={onAddNewPaymentMethod}
              address={address}
            />
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
