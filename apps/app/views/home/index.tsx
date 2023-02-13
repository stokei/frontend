import { useCurrentApp, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { Container, Stack, Title } from "@stokei/ui";
import { FC } from "react";
import { ProductsList } from "./components/products-list";
import { useProductsQuery } from "./graphql/products.query.graphql.generated";
import { HomeLayout } from "./layout";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoadingCourses, data: dataCourses }] = useProductsQuery({
    variables: {
      where: {
        AND: {
          parent: {
            startsWith: "course_",
          },
          app: {
            equals: currentApp?.id,
          },
        },
      },
      orderBy: {
        createdAt: OrderBy.Desc,
      },
    },
  });

  return (
    <HomeLayout isLoading={isLoadingCourses}>
      <Stack direction="column" spacing="5" paddingY="10">
        {!!dataCourses?.products?.items?.length && (
          <Container as="section" paddingY="5">
            <Title size="lg" marginBottom="5">
              {translate.formatMessage({ id: "recommendedCourses" })}
            </Title>
            <ProductsList products={dataCourses?.products} />
          </Container>
        )}
      </Stack>
    </HomeLayout>
  );
};
