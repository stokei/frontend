import { StripeImage } from "@/components/stripe-image";
import { paymentGatewayFees } from "@/constants/payment-gateway-fees";
import { useCurrentApp, useTranslations } from "@/hooks";
import {
  PaymentGatewayType,
  PaymentMethodType,
} from "@/services/graphql/stokei";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Title,
} from "@stokei/ui";

export const PlanItemPaymentWithStripe = () => {
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const paymentGateway =
    paymentGatewayFees[PaymentGatewayType.Stripe][PaymentMethodType.Stripe];
  const transferAmount = translate.formatMoney({
    showSymbol: true,
    amount: paymentGateway?.transferAmount || 0,
    currency: currentApp?.currency?.id || "",
    minorUnit: currentApp?.currency?.minorUnit,
  });

  return (
    <Card background="background.50">
      <CardHeader>
        <Stack spacing="2" justify="center" align="center">
          <Avatar
            background="primary.500"
            size="lg"
            icon={<Icon name="plan" fontSize="2xl" color="white.500" />}
          />
          <Title size={"md"} textAlign="center">
            {translate.formatMessage({ id: "salesByInternationalPayment" })}
          </Title>
        </Stack>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Stack direction="column" spacing="5">
          <List>
            <ListItem>
              <ListIcon name="check" color="green.500" />
              {translate.formatMessage({
                id: "receiveByCardIn30DaysForPaymentsByCard",
              })}
            </ListItem>
            <ListItem>
              <ListIcon name="check" color="green.500" />
              {translate.formatMessage(
                {
                  id: "theTransferFeeToBankAccount",
                },
                {
                  transferAmount,
                }
              )}
            </ListItem>
          </List>

          <StripeImage width="12" />
        </Stack>
      </CardBody>
      <CardFooter background="background.200">
        <Stack
          width="full"
          direction={["column", "column", "column", "column"]}
          align="center"
          justify="center"
        >
          <Stack
            width="fit-content"
            direction="row"
            align="center"
            justify="center"
          >
            <Text
              fontSize="2xl"
              color="primary.500"
              fontWeight="900"
              lineHeight="shorter"
            >
              {paymentGateway?.percentage}%
            </Text>
            {paymentGateway?.fixAmount && (
              <>
                <Text fontSize="md">+</Text>
                <Text fontSize="md" fontWeight="600">
                  {translate.formatMoney({
                    showSymbol: true,
                    amount: paymentGateway?.fixAmount,
                    currency: currentApp?.currency?.id || "",
                    minorUnit: currentApp?.currency?.minorUnit,
                  })}
                </Text>
              </>
            )}
          </Stack>
          <Text fontSize="md" color="text.400">
            {`${translate.formatMessage({
              id: "each",
            })} ${translate.formatMessage({ id: "sale" })}`}
          </Text>
        </Stack>
      </CardFooter>
    </Card>
  );
};
