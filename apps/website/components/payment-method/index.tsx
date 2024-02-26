import { useTranslations } from "@/hooks";
import { I18nKey } from "@/interfaces/i18n-key";
import { PaymentMethodType } from "@/services/graphql/stokei";
import { getCardFlagURL } from "@/utils";
import { Box, IColor, Icon, IconName, Image, Stack, Text } from "@stokei/ui";
import { useMemo } from "react";
import { PaymentMethodComponentFragment } from "./graphql/payment-method.fragment.graphql.generated";

interface PaymentMethodData {
  color: IColor;
  iconName: IconName;
  text: I18nKey;
}

export interface PaymentMethodProps {
  paymentMethod: PaymentMethodComponentFragment;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
}) => {
  const translate = useTranslations();

  const paymentMethodData: PaymentMethodData = useMemo(() => {
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
        iconName: "card",
        text: "internationalPayment",
      },
    };
    return methods[paymentMethod?.type || PaymentMethodType.Card];
  }, [paymentMethod]);

  if (paymentMethod?.type === PaymentMethodType.Card) {
    return (
      <Stack width="fit-content" direction="row" spacing="4" align="center">
        <Image
          width="10"
          src={getCardFlagURL(paymentMethod?.cardBrand)}
          fallbackSrc={getCardFlagURL()}
          alt={paymentMethod?.cardBrand || ""}
        />
        <Box width="full" align="center" justify="flex-end">
          <Text fontWeight="semibold">
            **** {paymentMethod?.lastFourCardNumber}
          </Text>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing="3" align="center">
      <Icon
        name={paymentMethodData?.iconName}
        color={paymentMethodData?.color}
      />
      <Text fontWeight="semibold">
        {translate.formatMessage({ id: paymentMethodData?.text })}
      </Text>
    </Stack>
  );
};
