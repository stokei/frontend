import { STRIPE_URL } from "@/constants/stripe-links";
import { useTranslations } from "@/hooks";
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
      <CardBody paddingTop={0}>
        <List>
          <ListItem>
            <ListIcon name="check" color="green.500" />
            {translate.formatMessage({
              id: "receiveByCardIn30DaysAnd2WorkingDaysForPaymentsByBoleto",
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
            <Text fontSize="md" fontWeight="600">
              %
            </Text>
            <Text
              fontSize="2xl"
              color="primary.500"
              fontWeight="900"
              lineHeight="shorter"
            >
              7%
            </Text>
          </Stack>
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
      </CardFooter>
    </Card>
  );
};
