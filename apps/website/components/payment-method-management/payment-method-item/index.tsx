import { PaymentMethodComponentFragment } from "@/components/payment-method/graphql/payment-method.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { getCardFlagURL } from "@/utils";
import { Box, Image, Stack, Text } from "@stokei/ui";

interface PaymentMethodItemProps {
  readonly paymentMethod?: PaymentMethodComponentFragment | null;
}

export const PaymentMethodItem = ({
  paymentMethod,
}: PaymentMethodItemProps) => {
  const translate = useTranslations();
  return (
    <Stack direction="row" spacing="4" align="center">
      <Image
        width="12"
        height="fit-content"
        src={getCardFlagURL(paymentMethod?.cardBrand)}
        fallbackSrc={getCardFlagURL()}
        alt={paymentMethod?.cardBrand || ""}
      />
      <Box width="full" align="center" justify="flex-end">
        <Stack
          width="auto"
          direction="column"
          spacing="2"
          align="flex-end"
          justify="center"
        >
          <Text fontWeight="semibold">
            **** **** **** {paymentMethod?.lastFourCardNumber}
          </Text>
          {paymentMethod?.cardExpiryMonth && paymentMethod?.cardExpiryYear && (
            <Stack width="auto" direction="row" spacing="2" align="center">
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
      </Box>
    </Stack>
  );
};
