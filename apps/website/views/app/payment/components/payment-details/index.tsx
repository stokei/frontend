import { PaymentMethod } from "@/components/payment-method";
import { useTranslations } from "@/hooks";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Label,
  Stack,
  Text,
  Title,
} from "@stokei/ui";

import { PaymentPagePaymentFragment } from "../../graphql/payment.query.graphql.generated";

interface PaymentDetailsProps {
  readonly payment?: PaymentPagePaymentFragment;
}

export const PaymentDetails = ({ payment }: PaymentDetailsProps) => {
  const translate = useTranslations();

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "informations" })}
      </Title>

      <Card background="background.50">
        <CardBody>
          <Stack direction="column" spacing="5">
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "payer" })}</Label>
              {payment?.payer && (
                <Stack direction="row" spacing="4" align="center">
                  <Avatar
                    size="sm"
                    src={payment?.payer?.avatar?.file?.url || ""}
                    name={payment?.payer?.fullname}
                  />
                  <Stack direction="column" spacing="0">
                    <Text fontWeight="bold">{payment?.payer?.fullname}</Text>
                    <Text fontSize="xs" color="text.300">
                      {payment?.payer?.email}
                    </Text>
                  </Stack>
                </Stack>
              )}
            </Box>
            {payment?.paymentMethod && (
              <Box flexDirection="column">
                <Label>{translate.formatMessage({ id: "value" })}</Label>
                <PaymentMethod paymentMethod={payment?.paymentMethod} />
              </Box>
            )}
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "value" })}</Label>
              <Text fontWeight="semibold">
                {translate.formatMoney({
                  showSymbol: true,
                  amount: payment?.totalAmount || 0,
                  currency: payment?.currency.id || "",
                  minorUnit: payment?.currency.minorUnit,
                })}
              </Text>
            </Box>
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "feeAmount" })}</Label>
              <Text fontWeight="semibold">
                {translate.formatMoney({
                  showSymbol: true,
                  amount: payment?.feeAmount || 0,
                  currency: payment?.currency.id || "",
                  minorUnit: payment?.currency.minorUnit,
                })}
              </Text>
            </Box>
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "lastUpdate" })}</Label>
              <Text fontWeight="semibold">
                {translate.formatDate(payment?.updatedAt || "", {
                  fullDate: true,
                })}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
