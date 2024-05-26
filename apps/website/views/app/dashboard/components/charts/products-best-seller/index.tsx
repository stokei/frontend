import { useTranslations } from "@/hooks";
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Text,
  Title
} from "@stokei/ui";
import { GetMetricsQuery } from "../../../graphql/metrics.query.graphql.generated";
import { Section } from "../section";

export const ProductsBestSeller = ({
  data,
  isLoading
}: {
  isLoading: boolean;
  data: GetMetricsQuery['productsBestSellerByPeriod']
}) => {
  const translate = useTranslations();

  return (
    <Section
      title={translate.formatMessage({ id: 'productsBestSeller' })}
      isEmpty={!data.length}
      isLoading={isLoading}
    >
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
    </Section>
  );
};
