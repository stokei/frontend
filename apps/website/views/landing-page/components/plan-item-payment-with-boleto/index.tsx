import { paymentGatewayFees } from "@/constants/payment-gateway-fees";
import { PaymentGatewayType } from "@/constants/payment-gateway-type";
import { STRIPE_PRICES_URL } from "@/constants/stripe-links";
import { useTranslations } from "@/hooks";
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

interface PlanItemPaymentWithBoletoProps {}

export const PlanItemPaymentWithBoleto: FC<
  PlanItemPaymentWithBoletoProps
> = () => {
  const translate = useTranslations();
  const stripeGateway = paymentGatewayFees[PaymentGatewayType.STRIPE];
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
            {translate.formatMessage({ id: "salesByBoleto" })}
          </Title>
        </Stack>
      </CardHeader>
      <CardBody paddingTop={0}>
        <List>
          <ListItem>
            <ListIcon name="check" color="green.500" />
            {translate.formatMessage({
              id: "receiveByBoletoIn2DaysForPaymentsByBoleto",
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
              {stripeGateway.percentage}%
            </Text>
            <Text fontSize="md">+</Text>
            <Link fontSize="md" href={STRIPE_PRICES_URL} target="_blank">
              {translate.formatMessage({ id: "stripeTax" })}
            </Link>
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
