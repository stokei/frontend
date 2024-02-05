import { AddressManagementAddressFragment } from "@/components/address-management/graphql/addresses.query.graphql.generated";
import { PaymentMethodManagement } from "@/components/payment-method-management";
import { PaymentMethodManagementPaymentMethodCardFragment } from "@/components/payment-method-management/graphql/payment-methods.query.graphql.generated";
import { useCurrentApp, useTranslations } from "@/hooks";
import { PaymentMethodType } from "@/services/graphql/stokei";
import {
  Button,
  ButtonGroup,
  RadioCard,
  RadioGroup,
  Stack,
  Title,
} from "@stokei/ui";
import { PaymentMethod } from "../../components/payment-method";

export interface PaymentMethodStepProps {
  address?: AddressManagementAddressFragment;
  paymentMethod?: PaymentMethodManagementPaymentMethodCardFragment;
  paymentMethodType?: PaymentMethodType;
  onChoosePaymentMethod: (
    paymentMethod?: PaymentMethodManagementPaymentMethodCardFragment
  ) => void;
  onChoosePaymentMethodType: (paymentMethodType: PaymentMethodType) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({
  address,
  paymentMethod,
  paymentMethodType,
  onChoosePaymentMethod,
  onChoosePaymentMethodType,
  onNextStep,
  onPreviousStep,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const isDisabledNextButton =
    paymentMethodType === PaymentMethodType.Card
      ? !paymentMethodType || !paymentMethod
      : !paymentMethodType;

  return (
    <Stack direction="column" spacing="10">
      <Title fontSize="lg">
        {translate.formatMessage({ id: "chooseYourPaymentMethod" })}
      </Title>
      <RadioGroup
        value={paymentMethodType}
        onChange={onChoosePaymentMethodType}
      >
        <Stack spacing="5" direction="column">
          {currentApp?.isIntegratedWithPagarme && (
            <>
              <RadioCard
                id={PaymentMethodType.Boleto}
                value={PaymentMethodType.Boleto}
                isChecked={paymentMethodType === PaymentMethodType.Boleto}
              >
                <PaymentMethod paymentMethodType={PaymentMethodType.Boleto} />
              </RadioCard>
              <RadioCard
                id={PaymentMethodType.Pix}
                value={PaymentMethodType.Pix}
                isChecked={paymentMethodType === PaymentMethodType.Pix}
              >
                <PaymentMethod paymentMethodType={PaymentMethodType.Pix} />
              </RadioCard>
              <RadioCard
                id={PaymentMethodType.Card}
                value={PaymentMethodType.Card}
                isChecked={paymentMethodType === PaymentMethodType.Card}
              >
                <PaymentMethod paymentMethodType={PaymentMethodType.Card} />
              </RadioCard>
              {paymentMethodType === PaymentMethodType.Card && (
                <PaymentMethodManagement
                  selectedPaymentMethod={paymentMethod}
                  address={address?.id}
                  onChoosePaymentMethod={onChoosePaymentMethod}
                />
              )}
            </>
          )}
        </Stack>
      </RadioGroup>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={isDisabledNextButton}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
