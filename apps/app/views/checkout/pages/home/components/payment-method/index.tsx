import { PaymentMethodManagementPaymentMethodCardFragment } from "@/components/payment-method-management/graphql/payment-methods.query.graphql.generated";
import { PaymentMethodItem } from "@/components/payment-method-management/payment-method-item";
import { useTranslations } from "@/hooks";
import { I18nKey } from "@/interfaces/i18n-key";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { IColor, Icon, IconName, Stack, Text } from "@stokei/ui";
import { useMemo } from "react";

interface PaymentMethodData {
  color: IColor;
  iconName: IconName;
  text: I18nKey;
}

export interface PaymentMethodProps {
  isDisabled?: boolean;
  paymentMethodType: PaymentMethodType;
  paymentMethod?: PaymentMethodManagementPaymentMethodCardFragment;
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
      [PaymentMethodType.Stripe]: {
        color: "text.500",
        iconName: "card",
        text: "internationalPayment",
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
    };
    return methods[paymentMethodType];
  }, [paymentMethodType]);

  return (
    <Stack direction="column" spacing="5">
      <Stack direction="row" spacing="3" align="center">
        <Icon
          name={paymentMethodConfig?.iconName}
          color={isDisabled ? "gray.500" : paymentMethodConfig?.color}
        />
        <Text fontWeight="bold" color={isDisabled ? "gray.500" : undefined}>
          {translate.formatMessage({ id: paymentMethodConfig?.text })}
        </Text>
      </Stack>
      {paymentMethod && paymentMethodType === PaymentMethodType.Card && (
        <PaymentMethodItem paymentMethod={paymentMethod} />
      )}
    </Stack>
  );
};
