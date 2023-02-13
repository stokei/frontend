import { useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { Box, Container, Stack, Title } from "@stokei/ui";
import { FC, useMemo } from "react";
import { ProductsList } from "./components/products-list";
import { useGetProductPlansQuery } from "./graphql/plans.query.graphql.generated";
import { PlansLayout } from "./layout";

interface PlansPageProps {}

export const PlansPage: FC<PlansPageProps> = () => {
  const translate = useTranslations();

  const [{ data: dataGetProductPlans, fetching: isLoadingGetProductPlans }] =
    useGetProductPlansQuery({
      variables: {
        where: {
          AND: {
            parent: {
              startsWith: "plan_",
            },
          },
        },
        orderBy: {
          name: OrderBy.Asc,
        },
      },
    });

  const products = useMemo(
    () => dataGetProductPlans?.products,
    [dataGetProductPlans]
  );

  return (
    <PlansLayout isLoading={isLoadingGetProductPlans}>
      <Container paddingY="10">
        <Stack direction="column" spacing="10">
          <Stack direction="column" spacing="1" align="center" justify="center">
            <Title>{translate.formatMessage({ id: "theRightPlanFor" })}</Title>
            <Title color="primary.500">
              {translate.formatMessage({ id: "yourBusiness" })}
            </Title>
          </Stack>
          <ProductsList products={products} />
        </Stack>
      </Container>
    </PlansLayout>
  );
};
