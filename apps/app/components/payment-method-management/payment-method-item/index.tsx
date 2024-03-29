import { useTranslations } from "@/hooks";
import { getCardFlagURL } from "@/utils";
import { Box, Image, Stack, Text } from "@stokei/ui";
import { FC } from "react";
import { PaymentMethodManagementPaymentMethodCardFragment } from "../graphql/payment-methods.query.graphql.generated";

interface PaymentMethodItemProps {
  readonly paymentMethod?: PaymentMethodManagementPaymentMethodCardFragment | null;
}

export const PaymentMethodItem: FC<PaymentMethodItemProps> = ({
  paymentMethod,
}) => {
  const translate = useTranslations();
  return (
    <Stack direction="column" spacing="4" align="center">
      <Image
        width="12"
        height="fit-content"
        src={getCardFlagURL(paymentMethod?.cardBrand)}
        fallbackSrc={getCardFlagURL()}
        alt={paymentMethod?.cardBrand || ""}
      />
      <Stack
        width="fit-content"
        height="fit-content"
        direction="column"
        spacing="2"
        align="flex-end"
        justify="center"
      >
        <Text fontWeight="semibold">
          **** **** **** {paymentMethod?.lastFourCardNumber}
        </Text>
        {paymentMethod?.cardExpiryMonth && paymentMethod?.cardExpiryYear && (
          <Stack width="fit-content" direction="row" spacing="2" align="center">
            <Text fontSize="sm">
              {translate.formatMessage({ id: "validUntil" })}:
            </Text>
            <Text fontSize="sm">
              {translate.formatDate(
                new Date(
                  `${paymentMethod?.cardExpiryYear}/${paymentMethod?.cardExpiryMonth}/01`
                ),
                {
                  month: "2-digit",
                  year: "numeric",
                }
              )}
            </Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
