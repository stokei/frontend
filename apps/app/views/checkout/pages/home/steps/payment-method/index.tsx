import { useCurrentApp, useTranslations } from "@/hooks";
import { PaymentMethodType } from "@/services/graphql/stokei";
import {
  Button,
  ButtonGroup,
  Loading,
  RadioCard,
  RadioGroup,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { PaymentMethod } from "../../components/payment-method";
import { usePlugins } from "@/hooks/use-plugins";

export interface PaymentMethodStepProps {
  paymentMethodType?: PaymentMethodType;
  onChoosePaymentMethodType: (paymentMethodType: PaymentMethodType) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const PaymentMethodStep = ({
  paymentMethodType,
  onChoosePaymentMethodType,
  onNextStep,
  onPreviousStep,
}: PaymentMethodStepProps) => {
  const translate = useTranslations();
  const {
    isLoading,
    hasPlugins,
    paymentGateways,
    defaultPaymentGateway,
  } = usePlugins();

  const isDisabledNextButton = !paymentMethodType;

  return (
    <Stack direction="column" spacing="10">
      <Title fontSize="lg">
        {translate.formatMessage({ id: "chooseYourPaymentMethod" })}
      </Title>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!hasPlugins ? (
            <Text>{translate.formatMessage({ id: "paymentMethodsNotFound" })}</Text>
          ) : (
            <>
              <RadioGroup
                value={paymentMethodType}
                onChange={onChoosePaymentMethodType}
              >
                <Stack spacing="5" direction="column">
                  {defaultPaymentGateway && (
                    <>
                      <RadioCard
                        id={PaymentMethodType.Boleto}
                        value={PaymentMethodType.Boleto}
                        isChecked={paymentMethodType === PaymentMethodType.Boleto}
                      >
                        <PaymentMethod
                          paymentMethodType={PaymentMethodType.Boleto}
                        />
                      </RadioCard>
                      <RadioCard
                        id={PaymentMethodType.Pix}
                        value={PaymentMethodType.Pix}
                        isChecked={paymentMethodType === PaymentMethodType.Pix}
                      >
                        <PaymentMethod
                          paymentMethodType={PaymentMethodType.Pix}
                        />
                      </RadioCard>
                      <RadioCard
                        id={PaymentMethodType.Card}
                        value={PaymentMethodType.Card}
                        isChecked={paymentMethodType === PaymentMethodType.Card}
                      >
                        <PaymentMethod
                          paymentMethodType={PaymentMethodType.Card}
                        />
                      </RadioCard>
                    </>
                  )}

                  {paymentGateways?.map(paymentGateway => (
                    <RadioCard
                      id={paymentGateway.id}
                      key={paymentGateway.id}
                      value={paymentGateway.type}
                      isChecked={paymentMethodType === paymentGateway.type as any}
                    >
                      <PaymentMethod paymentMethodType={paymentGateway.type as any} />
                    </RadioCard>
                  ))}
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
            </>
          )}
        </>
      )}
    </Stack>
  );
};
