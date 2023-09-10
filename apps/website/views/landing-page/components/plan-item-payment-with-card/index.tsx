import { paymentGatewayFees } from "@/constants/payment-gateway-fees";
import { STRIPE_PRICES_URL } from "@/constants/stripe-links";
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
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Title,
} from "@stokei/ui";
import { FC } from "react";

interface PlanItemPaymentWithCardProps {}

export const PlanItemPaymentWithCard: FC<PlanItemPaymentWithCardProps> = () => {
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const stripeGateway =
    paymentGatewayFees[PaymentGatewayType.Stripe][PaymentMethodType.Card];
  const transferAmount = translate.formatMoney({
    showSymbol: true,
    amount: stripeGateway?.transferAmount || 0,
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
            {translate.formatMessage({ id: "salesByCard" })}
          </Title>
        </Stack>
      </CardHeader>
      <CardBody paddingTop={0}>
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
              {stripeGateway?.percentage}%
            </Text>
            {stripeGateway?.fixAmount && (
              <>
                <Text fontSize="md">+</Text>
                <Text fontSize="md" fontWeight="600">
                  {translate.formatMoney({
                    showSymbol: true,
                    amount: stripeGateway?.fixAmount,
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
