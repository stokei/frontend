import { useTranslations } from "@/hooks";
import { Box, Image, Radio, RadioCard, Stack, Text } from "@stokei/ui";
import { FC, memo } from "react";
import { CheckoutPaymentMethodFragment } from "../../graphql/payment-method.fragment.graphql.generated";

interface PaymentMethodItemProps {
  readonly paymentMethod?: CheckoutPaymentMethodFragment;
  readonly onChoosePaymentMethod: () => void;
}

export const PaymentMethodItem: FC<PaymentMethodItemProps> = memo(
  ({ paymentMethod }) => {
    const translate = useTranslations();
    return (
      <Stack rounded="md" borderWidth="thin">
        <RadioCard
          paddingX="5"
          paddingY="3"
          id={paymentMethod?.id || ""}
          value={paymentMethod?.id || ""}
        >
          <Stack direction="row" spacing="4" align="center">
            <Image
              width="12"
              height="fit-content"
              src={`/assets/card-flags/${paymentMethod?.cardBrand?.toLowerCase()}.svg`}
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
                {paymentMethod?.cardExpiryMonth &&
                  paymentMethod?.cardExpiryYear && (
                    <Stack
                      width="auto"
                      direction="row"
                      spacing="2"
                      align="center"
                    >
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
        </RadioCard>
      </Stack>
    );
  }
);
