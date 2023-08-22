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
  paymentMethodType: PaymentMethodType;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethodType,
}) => {
  const translate = useTranslations();

  const paymentMethod: PaymentMethodData = useMemo(() => {
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
    };
    return methods[paymentMethodType];
  }, [paymentMethodType]);

  return (
    <Stack direction="row" spacing="3" align="center">
      <Icon name={paymentMethod?.iconName} color={paymentMethod?.color} />
      <Text fontWeight="bold">
        {translate.formatMessage({ id: paymentMethod?.text })}
      </Text>
    </Stack>
  );
};
