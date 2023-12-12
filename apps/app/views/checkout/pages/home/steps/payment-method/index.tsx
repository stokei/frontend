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
  paymentMethodType?: PaymentMethodType;
  onChoosePaymentMethod: (paymentMethodType: PaymentMethodType) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const PaymentMethodStep: React.FC<PaymentMethodStepProps> = ({
  paymentMethodType,
  onChoosePaymentMethod,
  onNextStep,
  onPreviousStep,
}) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Stack direction="column" spacing="10">
      <Title fontSize="lg">
        {translate.formatMessage({ id: "chooseYourPaymentMethod" })}
      </Title>
      <RadioGroup value={paymentMethodType} onChange={onChoosePaymentMethod}>
        <Stack spacing="5" direction="column">
          {currentApp?.isIntegratedWithStripe && (
            <>
              <RadioCard
                id={PaymentMethodType.Boleto}
                value={PaymentMethodType.Boleto}
                isChecked={paymentMethodType === PaymentMethodType.Boleto}
              >
                <PaymentMethod paymentMethodType={PaymentMethodType.Boleto} />
              </RadioCard>
              <RadioCard
                id={PaymentMethodType.Card}
                value={PaymentMethodType.Card}
                isChecked={paymentMethodType === PaymentMethodType.Card}
              >
                <PaymentMethod paymentMethodType={PaymentMethodType.Card} />
              </RadioCard>
            </>
          )}
          {currentApp?.isIntegratedWithPix && (
            <RadioCard
              id={PaymentMethodType.Pix}
              value={PaymentMethodType.Pix}
              isChecked={paymentMethodType === PaymentMethodType.Pix}
            >
              <PaymentMethod paymentMethodType={PaymentMethodType.Pix} />
            </RadioCard>
          )}
        </Stack>
      </RadioGroup>

      <ButtonGroup width="full" justifyContent="space-between">
        <Button onClick={onPreviousStep} variant="ghost">
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button onClick={onNextStep} isDisabled={!paymentMethodType}>
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
