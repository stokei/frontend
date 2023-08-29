import { useTranslations } from "@/hooks";
import { getPaymentStatusColor } from "@/utils/get-payment-status-color";
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
import { PaymentPagePaymentFragment } from "../../graphql/payment.query.graphql.generated";

interface StatsProps {
  readonly payment?: PaymentPagePaymentFragment;
}

export const Stats: FC<StatsProps> = ({ payment }) => {
  const translate = useTranslations();

  const statusColor = useMemo(
    () => getPaymentStatusColor(payment?.status as any),
    [payment]
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
                  id: payment?.status?.toLowerCase() as any,
                })}
              </Badge>
            </Stack>
          </CardBody>
        </Card>
        <Card background="background.50">
          <CardBody>
            <Stack direction="column" spacing="2">
              <Label>{translate.formatMessage({ id: "value" })}</Label>
              <Title fontSize="lg">
                {translate.formatMoney({
                  showSymbol: true,
                  amount: payment?.totalAmount || 0,
                  currency: payment?.currency.id || "",
                  minorUnit: payment?.currency.minorUnit,
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
                {translate.formatDate(payment?.createdAt || "", {
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
