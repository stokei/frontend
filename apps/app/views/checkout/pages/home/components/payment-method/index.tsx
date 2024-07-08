import { PaymentMethodItem } from "@/components/payment-method-management/payment-method-item";
import { PaymentMethodComponentFragment } from "@/components/payment-method/graphql/payment-method.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { I18nKey } from "@/interfaces/i18n-key";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { IColor, Icon, IconName, Stack, Text } from "@stokei/ui";
import { useMemo } from "react";

interface PaymentMethodData {
  color: IColor;
  iconName: IconName;
  text?: I18nKey;
  help?: I18nKey;
}

export interface PaymentMethodProps {
  isDisabled?: boolean;
  paymentMethodType: PaymentMethodType;
  paymentMethod?: PaymentMethodComponentFragment;
}

export const PaymentMethod = ({
  paymentMethodType,
  paymentMethod,
  isDisabled,
}: PaymentMethodProps) => {
  const translate = useTranslations();

  const paymentMethodConfig: PaymentMethodData = useMemo(() => {
    const methods: Record<PaymentMethodType, PaymentMethodData> = {
      [PaymentMethodType.Pix]: {
        color: "green.500",
        iconName: "pix",
        text: "pix",
      },
      [PaymentMethodType.Card]: {
        color: "text.500",
        iconName: "card",
        text: "card",
      },
      [PaymentMethodType.Boleto]: {
        color: "text.500",
        iconName: "boleto",
        text: "boleto",
      },
      [PaymentMethodType.Stripe]: {
        color: "text.500",
        iconName: "stripe",
        help: "internationalPayment",
      },
      [PaymentMethodType.Mercadopago]: {
        color: "text.500",
        iconName: "mercadopago",
        help: "internationalPayment",
      },
      [PaymentMethodType.Pagarme]: {
        color: "text.500",
        iconName: "pagarme",
      },
      [PaymentMethodType.Pagseguro]: {
        color: "text.500",
        iconName: "pagseguro",
      }
    };
    return methods[paymentMethodType];
  }, [paymentMethodType]);

  if (!paymentMethodConfig) {
    return <></>
  }

  return (
    <Stack direction="column" spacing="5">
      <Stack direction="column" spacing="2">
        <Stack direction="row" spacing="3" align="center">
          <Icon
            name={paymentMethodConfig?.iconName}
            color={isDisabled ? "gray.500" : paymentMethodConfig?.color}
          />
          {paymentMethodConfig?.text && (
            <Text fontWeight="bold" color={isDisabled ? "gray.500" : undefined}>
              {translate.formatMessage({ id: paymentMethodConfig?.text })}
            </Text>
          )}
        </Stack>
        {paymentMethodConfig?.help && (
          <Text fontSize="xs" color={isDisabled ? "gray.500" : undefined}>
            {translate.formatMessage({ id: paymentMethodConfig?.help })}
          </Text>
        )}
      </Stack>

      {paymentMethod && paymentMethodType === PaymentMethodType.Card && (
        <PaymentMethodItem paymentMethod={paymentMethod} />
      )}
    </Stack>
  );
};
