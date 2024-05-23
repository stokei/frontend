import { useTranslations } from "@/hooks";
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Text,
  Title
} from "@stokei/ui";
import { GetMetricsQuery } from "../../graphql/metrics.query.graphql.generated";

export const ProductsBestSeller = ({ data }: { data: GetMetricsQuery['productsBestSellerByPeriod'] }) => {
  const translate = useTranslations();

  return (
    <Card background="background.50">
      <CardBody>
        <Title marginBottom="5" fontSize="large">{translate.formatMessage({ id: 'productsBestSeller' })}</Title>
        <Stack direction="column" spacing="5">
          {data?.map(({ product, quantity }) => (
            <Card size="sm" key={product.id}>
              <CardBody>
                <Stack direction="row" spacing="5" align="center">
                  <Avatar
                    size="sm"
                    src={product.avatar?.file?.url || ""}
                    name={product.name}
                  />
                  <Stack direction="column" spacing="1">
                    <Title fontSize="sm">{product?.name}</Title>
                    <Text fontSize="xs">{translate.formatMessage({ id: 'quantity' })}: {quantity}</Text>
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
