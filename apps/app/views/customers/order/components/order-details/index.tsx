import { useTranslations } from "@/hooks";
import { Box, Card, CardBody, Label, Stack, Text, Title } from "@stokei/ui";

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

  return (
    <Stack direction="column" spacing="5">
      <Title fontSize="md" lineHeight="shorter">
        {translate.formatMessage({ id: "informations" })}
      </Title>

      <Card background="background.50">
        <CardBody>
          <Stack direction="column" spacing="5">
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
