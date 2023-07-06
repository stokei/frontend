import { STRIPE_URL } from "@/constants/stripe-links";
import { useTranslations } from "@/hooks";
import {
  Avatar,
  Card,
  CardBody,
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

interface PaymentGatewayItemProps {}

export const PaymentGatewayItem: FC<PaymentGatewayItemProps> = () => {
  const translate = useTranslations();
  return (
    <Card background="background.50">
      <CardHeader>
        <Stack spacing="2" justify="center" align="center">
          <Avatar
            background="primary.500"
            size="lg"
            icon={<Icon name="plan" fontSize="2xl" color="white.500" />}
          />
          <Title size={"md"}>{translate.formatMessage({ id: "sales" })}</Title>
        </Stack>
      </CardHeader>
      <CardBody background="background.200">
        <Stack spacing="5">
          <List>
            <ListItem>
              <ListIcon name="check" color="green.500" />
              {translate.formatMessage({
                id: "receiveByCardIn30DaysAnd2WorkingDaysForPaymentsByBoleto",
              })}
            </ListItem>
          </List>
          <Stack width="full" direction="row" align="center" justify="center">
            <Text fontSize="md" fontWeight="600">
              %
            </Text>
            <Text
              fontSize="3xl"
              color="primary.500"
              fontWeight="900"
              lineHeight="shorter"
            >
              7%
            </Text>
            <Stack width="fit-content" direction="row" spacing="1">
              <Text fontSize="md" color="text.200">
                {translate.formatMessage({ id: "each" })}
              </Text>
              <Text fontSize="md" color="text.200">
                {translate.formatMessage({ id: "sale" })}
              </Text>
              <Text fontSize="md" color="text.200">
                +
              </Text>
              <Link fontSize="md" href={STRIPE_URL} target="_blank">
                {translate.formatMessage({ id: "stripeTax" })}
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
