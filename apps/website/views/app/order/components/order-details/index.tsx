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
import { useMemo } from "react";
import { OrderPageOrderFragment } from "../../graphql/order.query.graphql.generated";
import { CouponItem } from "../coupon-item";

interface Customer {
  name: string;
  avatarURL: string;
  email: string;
}
interface OrderDetailsProps {
  readonly order?: OrderPageOrderFragment;
}

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const translate = useTranslations();

  const customer = useMemo<Customer | undefined>(() => {
    if (order?.parent?.__typename === "Account") {
      return {
        name: order?.parent?.fullname,
        email: order?.parent?.appEmail || "",
        avatarURL: order?.parent?.avatar?.file?.url || "",
      };
    }
    if (order?.parent?.__typename === "App") {
      return {
        name: order?.parent?.name,
        email: order?.parent?.accountEmail || "",
        avatarURL: order?.parent?.logo?.file?.url || "",
      };
    }
    return;
  }, [order]);

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "informations" })}
      </Title>

      <Card background="background.50">
        <CardBody>
          <Stack direction="column" spacing="5">
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "customer" })}</Label>
              <Stack direction="row" spacing="4" align="center">
                <Avatar
                  size="sm"
                  src={customer?.avatarURL}
                  name={customer?.name}
                />
                <Stack direction="column" spacing="0">
                  <Text fontWeight="bold">{customer?.name}</Text>
                  <Text fontSize="xs" color="text.300">
                    {customer?.email}
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Box flexDirection="column">
              <Label>{translate.formatMessage({ id: "lastUpdate" })}</Label>
              <Text>
                {translate.formatDate(order?.updatedAt || "", {
                  fullDate: true,
                })}
              </Text>
            </Box>
            {order?.coupon && (
              <Box flexDirection="column">
                <Label>{translate.formatMessage({ id: "coupon" })}</Label>
                <CouponItem coupon={order?.coupon} />
              </Box>
            )}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
