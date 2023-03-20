import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { Button, ButtonGroup, Stack } from "@stokei/ui";
import { FC } from "react";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-methods.query.graphql.generated";
import { PaymentMethodsList } from "../payment-methods-list";

interface CheckoutPaymentProps {
  readonly productId?: string;
  readonly avatarURL?: string;
  readonly currentPrice?: PriceComponentFragment | null;
  readonly currentPaymentMethod?: CheckoutPaymentMethodFragment | null;
  readonly onNextStep: () => void;
  readonly onPreviousStep: () => void;
  readonly onChangeCurrentPaymentMethod: (
    paymentMethod?: CheckoutPaymentMethodFragment | null
  ) => void;
}

export const CheckoutPayment: FC<CheckoutPaymentProps> = ({
  currentPaymentMethod,
  onNextStep,
  onChangeCurrentPaymentMethod,
  onPreviousStep,
}) => {
  const translate = useTranslations();

  /**
   *
   * ARRUMAR A ESCOLHA DO CARTÃO QUE ESTA BUGADA
   */

  return (
    <Stack direction="column" spacing="10">
      <PaymentMethodsList
        selectedPaymentMethod={currentPaymentMethod as any}
        onChoosePaymentMethod={onChangeCurrentPaymentMethod}
      />

      <ButtonGroup width="full" justifyContent="flex-end">
        <Button width="full" variant="ghost" onClick={onPreviousStep}>
          {translate.formatMessage({ id: "previous" })}
        </Button>
        <Button
          width="full"
          onClick={onNextStep}
          isDisabled={!currentPaymentMethod}
        >
          {translate.formatMessage({ id: "next" })}
        </Button>
      </ButtonGroup>
    </Stack>
  );
};
