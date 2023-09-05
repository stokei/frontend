import { paymentGatewayFees } from "@/constants/payment-gateway-fees";
import { PaymentGatewayType } from "@/constants/payment-gateway-type";
import { STRIPE_URL } from "@/constants/stripe-links";
import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Avatar,
  Box,
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

interface PlanItemPaymentWithPixProps {}

export const PlanItemPaymentWithPix: FC<PlanItemPaymentWithPixProps> = () => {
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const pagarmeGateway = paymentGatewayFees[PaymentGatewayType.PAGARME];
  return (
    <Card background="background.50">
      <CardHeader>
        <Stack spacing="2" justify="center" align="center">
          <Avatar
            background="primary.500"
            size="lg"
            icon={<Icon name="plan" fontSize="2xl" color="white.500" />}
          />
          <Title size={"md"}>
            {translate.formatMessage({ id: "salesByPix" })}
          </Title>
        </Stack>
      </CardHeader>
      <CardBody paddingTop={0}>
        <List>
          <ListItem>
            <ListIcon name="check" color="green.500" />
            {translate.formatMessage({
              id: "afterPaymentOfThePixTheAmountIsAvailableWithin2BusinessDays",
            })}
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
              {pagarmeGateway.percentage}%
            </Text>
            {pagarmeGateway.fixAmount && (
              <>
                <Text fontSize="md">+</Text>
                <Text fontSize="md" fontWeight="600">
                  {translate.formatMoney({
                    showSymbol: true,
                    amount: pagarmeGateway.fixAmount,
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
