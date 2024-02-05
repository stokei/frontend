import { useTranslations } from "@/hooks";
import { getOrderStatusColor } from "@/utils/get-order-status-color";
import {
  Badge,
  Card,
  CardBody,
  Label,
  SimpleGrid,
  Stack,
  Title,
} from "@stokei/ui";
import { FC, useMemo } from "react";
import { OrderPageOrderFragment } from "../../graphql/order.query.graphql.generated";

interface StatsProps {
  readonly order?: OrderPageOrderFragment;
}

export const Stats: FC<StatsProps> = ({ order }) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getOrderStatusColor(order?.status as any),
    [order]
  );

  return (
    <Stack direction="column" spacing="5">
      <SimpleGrid columns={[1, 1, 3, 3]} spacing="5">
        <Card background="background.50">
          <CardBody>
            <Stack direction="column" spacing="2">
              <Label>{translate.formatMessage({ id: "status" })}</Label>
              <Badge colorScheme={statusColor}>
                {translate.formatMessage({
                  id: order?.status?.toLowerCase() as any,
                })}
              </Badge>
            </Stack>
          </CardBody>
        </Card>
        <Card background="background.50">
          <CardBody>
            <Stack direction="column" spacing="2">
              <Label>{translate.formatMessage({ id: "total" })}</Label>
              <Title fontSize="lg">
                {translate.formatMoney({
                  showSymbol: true,
                  amount: order?.totalAmount || 0,
                  currency: order?.currency.id || "",
                  minorUnit: order?.currency.minorUnit,
                })}
              </Title>
            </Stack>
          </CardBody>
        </Card>
        <Card background="background.50">
          <CardBody>
            <Stack direction="column" spacing="2">
              <Label>{translate.formatMessage({ id: "creationDate" })}</Label>
              <Title fontSize="lg">
                {translate.formatDate(order?.createdAt || "", {
                  fullDate: true,
                })}
              </Title>
            </Stack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Stack>
  );
};
