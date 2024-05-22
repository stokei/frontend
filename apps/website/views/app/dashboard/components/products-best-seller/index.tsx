import { useTranslations } from "@/hooks";
import {
  Avatar,
  Card,
  CardBody,
  Stack,
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
          {data?.map(({ product }) => (
            <Stack direction="row" spacing="5" align="center">
              <Avatar
                src={product.avatar?.file?.url || ""}
                name={product.name}
              />
              <Title fontSize="md">{product?.name}</Title>
            </Stack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
