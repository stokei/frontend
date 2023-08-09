import { useTranslations } from "@/hooks";
import { PaymentMethodType } from "@/services/graphql/stokei";
import {
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  RadioCard,
  RadioGroup,
  Stack,
  Text,
} from "@stokei/ui";

export interface PaymentMethodStepProps {
  paymentMethodType: PaymentMethodType;
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

  return (
    <Stack direction="column" spacing="10">
      <RadioGroup value={paymentMethodType} onChange={onChoosePaymentMethod}>
        <Stack spacing="5" direction="column">
          <RadioCard
            id={PaymentMethodType.Boleto}
            value={PaymentMethodType.Boleto}
            isChecked={paymentMethodType === PaymentMethodType.Boleto}
          >
            <Stack direction="row" spacing="3" align="center">
              <Avatar
                background="primary.500"
                borderColor="primary.500"
                icon={<Icon name="boleto" />}
              />
              <Text fontWeight="bold">
                {translate.formatMessage({ id: "boleto" })}
              </Text>
            </Stack>
          </RadioCard>
          <RadioCard
            id={PaymentMethodType.Card}
            value={PaymentMethodType.Card}
            isChecked={paymentMethodType === PaymentMethodType.Card}
          >
            <Stack direction="row" spacing="3" align="center">
              <Avatar
                background="primary.500"
                borderColor="primary.500"
                icon={<Icon name="card" />}
              />
              <Text fontWeight="bold">
                {translate.formatMessage({ id: "card" })}
              </Text>
            </Stack>
          </RadioCard>
          <RadioCard
            id={PaymentMethodType.Pix}
            value={PaymentMethodType.Pix}
            isChecked={paymentMethodType === PaymentMethodType.Pix}
          >
            <Stack direction="row" spacing="3" align="center">
              <Avatar
                background="primary.500"
                borderColor="primary.500"
                icon={<Icon name="pix" />}
              />
              <Text fontWeight="bold">
                {translate.formatMessage({ id: "pix" })}
              </Text>
            </Stack>
          </RadioCard>
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
